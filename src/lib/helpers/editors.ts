import { activeTabId, editors, type EditorType } from '@/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';
import print from 'print-js';
import { Notpad } from '@/helpers/notpad';
import Quill from 'quill';
import { Delta, Range } from 'quill/core';
import { mode } from 'mode-watcher';

/**
 * A helper class for performing various editor-related tasks such as opening
 * a new editor, removing an editor, etc.
 */
export class Editors {
  init = async () => {
    const activeId = get(activeTabId);
    const editorsList = get(editors);

    if (!editorsList.some((editor) => editor.id === activeId) && editorsList.length > 0) {
      activeTabId.set(editorsList[0].id);
    }

    // Focus on the textarea when the active tab changes
    activeTabId.subscribe(async (editorId) => {
      // Adding a small delay, I don't know why, but it won't work without this
      await new Promise((resolve) => setTimeout(resolve, 120));
      this.focus(editorId);
    });
  };

  getActive = (): EditorType => {
    const activeId = get(activeTabId);
    const editorsList = get(editors);
    return editorsList.find((editor) => editor.id === activeId)!;
  };

  private getEditor = (editorId?: string) => {
    const editorsList = get(editors);
    if (editorId) {
      const editor = editorsList.find((editor) => editor.id === editorId);
      if (editor) {
        return editor;
      }
    }
    return this.getActive();
  };

  createNew({ content, fileName, fileHandle, filePath }: Partial<EditorType> = {}) {
    const newId = genId();
    editors.update((value) => {
      value.push({
        fileName: fileName ?? 'Untitled.txt',
        content: content ?? new Delta(),
        id: newId,
        fileHandle,
        filePath
      });

      return value;
    });
    activeTabId.update(() => newId);
  }

  remove(editorId: string) {
    let i = 0;
    let removeIndex = -1;
    editors.update((value) => {
      return value.filter((editor) => {
        if (editor.id == editorId) removeIndex = i;
        i++;
        return editor.id !== editorId;
      });
    });

    activeTabId.update((value) => {
      if (value === editorId) {
        if (removeIndex > 0) {
          return get(editors)[removeIndex - 1]?.id ?? null;
        } else if (removeIndex === 0 && get(editors).length > 0) {
          return get(editors)[0]?.id ?? null;
        }
      }
      return value;
    });
  }

  updateContent(id: string, content: Delta) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === id) {
          editor.content = content;
        }
        return editor;
      });
    });
  }

  updateFileName(editorId: string, fileName: string) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === editorId) {
          editor.fileName = fileName;
        }
        return editor;
      });
    });
    toast.success(`Title updated to "${fileName}"`);
  }

  updateFileHandle(editorId: string, fileHandle: FileSystemFileHandle) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, fileHandle, fileName: fileHandle.name };
        }
        return e;
      });
    });
  }

  updateFilePath(editorId: string, filePath: string) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, filePath };
        }
        return e;
      });
    });
  }

  getContent(editorId: string) {
    return get(editors).find((e) => e.id == editorId)?.content;
  }

  setQuill = async (editorId: string, quill: Quill) => {
    let editor: EditorType;
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          editor = e;
          return { ...e, quill };
        }
        return e;
      });
    });
    if (editor!.selection) quill.setSelection(editor!.selection);
    quill.on(
      'selection-change',
      (selection) => selection && this.updateSelection(editorId, selection)
    );
    quill.on('editor-change', () => {
      this.updateContent(editor.id, quill.getContents());
    });
  };

  updateSelection(editorId: string, selection: Range) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, selection };
        }
        return e;
      });
    });
  }

  focus = async (editorId?: string) => {
    const editor = this.getEditor(editorId);
    if (!editor.quill) return;
    const selection = editor.selection;

    await new Promise((resolve) => setTimeout(resolve, 50));
    editor.quill.focus();
    if (selection) editor.quill.setSelection(selection);
  };

  undo = (editorId?: string) => {
    const editor = this.getEditor(editorId);
    editor.quill!.history.undo();
    this.focus(editorId);
  };

  redo = (editorId?: string) => {
    const editor = this.getEditor(editorId);
    editor.quill!.history.redo();
    this.focus(editorId);
  };

  cut = (editorId?: string) => {
    const quill = this.getEditor(editorId).quill!;
    const selection = quill.getSelection()!;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/html': new Blob([clipboardData], { type: 'text/html' })
        })
      ])
      .catch((err) => {
        if (err instanceof Error) {
          err.message = 'Failed to cut to clipboard: ' + err.message;
        }
        Notpad.showError(err);
      });
    quill.deleteText(selection.index, selection.length);
    this.focus(editorId);
  };

  copy = (editorId?: string) => {
    const quill = this.getEditor(editorId).quill!;
    const selection = quill.getSelection()!;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/html': new Blob([clipboardData], { type: 'text/html' })
        })
      ])
      .catch((err) => {
        if (err instanceof Error) {
          err.message = 'Failed to copy to clipboard: ' + err.message;
        }
        Notpad.showError(err);
      });
    this.focus(editorId);
  };

  paste = (editorId?: string) => {
    const quill = this.getEditor(editorId).quill!;
    const range = quill.getSelection();
    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
      navigator.clipboard
        .read()
        .then((items) => {
          for (const item of items) {
            if (item.types.includes('text/html')) {
              item.getType('text/html').then((blob) => {
                blob.text().then((html) => {
                  quill.clipboard.dangerouslyPasteHTML(range.index, html);
                  this.focus(editorId);
                });
              });
            } else if (item.types.includes('text/plain')) {
              item.getType('text/plain').then((blob) => {
                blob.text().then((text) => {
                  quill.clipboard.dangerouslyPasteHTML(range.index, text);
                  this.focus(editorId);
                });
              });
            }
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            err.message = 'Failed to read clipboard contents: ' + err.message;
          }
          Notpad.showError(err);
        });
    }
  };

  selectAll = (editorId?: string) => {
    const quill = this.getEditor(editorId).quill!;
    quill.setSelection(0, quill.getLength());
    this.focus(editorId);
  };

  insertDateAndTime = (editorId?: string) => {
    const quill = this.getEditor(editorId).quill!;
    const date = new Date().toLocaleString();
    const range = quill.getSelection();
    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
    }
    quill.insertText(range?.index ?? 0, date);
    this.focus(editorId);
  };

  /**
   * Prints active editor.
   */
  print = async (editorId?: string) => {
    const editor = this.getEditor(editorId);
    const isDarkMode = get(mode) == 'dark';
    if (!editor) return;
    try {
      print({
        printable: editor.quill?.root.innerHTML,
        type: 'raw-html',
        style: `@import url('https://fonts.googleapis.com/css2?family=SUSE');
        * {
          font-family: 'SUSE', system-ui;
          color: ${isDarkMode ? 'white' : 'black'};
          background-color: ${isDarkMode ? 'black' : 'white'};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        a {
          color: #3b82f6;
          text-decoration-line: none;
        }
        `,
        font: 'SUSE',
        header: `${editor.fileName} - Notpad`
      });
    } catch (err) {
      Notpad.showError(err);
      self.print();
    }
  };
}
