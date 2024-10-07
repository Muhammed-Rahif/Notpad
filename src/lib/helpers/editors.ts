import { activeTabId, editors, type EditorType } from '@/store/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';
import Quill from 'quill';
import { Delta, Range } from 'quill/core';

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

  getEditor = (editorId?: string) => {
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
}
