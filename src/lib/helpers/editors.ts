import { activeTabId, editors } from '@/store/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';
import Quill from 'quill';
import { Delta, Range } from 'quill/core';
import type { EditorType } from '@/types/EditorTypes';
import { openSaveAndQuitDialog } from '../components/SaveAndQuitDialog.svelte';
import { Notpad } from './notpad';

/**
 * A helper class for performing various editor-related tasks such as opening
 * a new editor, removing an editor, etc.
 */
export class Editors {
  static defaultEditor: EditorType = {
    fileName: 'Untitled.txt',
    content: new Delta(),
    id: genId(),
    isSaved: false
  };

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

  createNew({ content, fileName, fileHandle, filePath, isSaved }: Partial<EditorType> = {}) {
    const newId = genId();
    editors.update((value) => {
      value.push({
        fileName: fileName ?? 'Untitled.txt',
        content: content ?? new Delta(),
        id: newId,
        fileHandle,
        filePath,
        isSaved
      });

      return value;
    });
    activeTabId.update(() => newId);
  }

  remove = async (editorId?: string) => {
    const editor = this.getEditor(editorId);
    const editorsList = get(editors);

    if (!editor.isSaved) {
      const status = await openSaveAndQuitDialog({
        fileName: editor.fileName
      });

      if (status == 'cancel') return;
      if (status == 'save') {
        await Notpad.fileOptions.save({ saveAs: true });
      }
    }

    if (editorsList.length === 1) {
      this.createNew();
    }

    editors.update((value) => {
      return value.filter((e) => e.id !== editor.id);
    });

    activeTabId.update((currentId) => {
      if (currentId === editor.id && editorsList.length > 0) {
        if (editorsList.length > 0) {
          const index = editorsList.findIndex((editor) => editor.id === editor.id);
          if (index === editorsList.length - 1) {
            return editorsList[index - 1].id;
          }
          return editorsList[index + 1].id;
        }
      }
      return currentId;
    });
  };

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
          editor.fileHandle = undefined;
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
    quill.on('editor-change', (type, range) => {
      if (range instanceof Range) this.setSelection(editorId, range);
      this.updateContent(editor.id, quill.getContents());
    });
  };

  setSelection(editorId: string, selection: Range, focus = false) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, selection };
        }
        return e;
      });
    });
    if (focus) this.focus(editorId);
  }

  setIsSaved(editorId: string, isSaved: boolean) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, isSaved };
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
