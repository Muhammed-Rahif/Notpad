import { activeTabId, editors, type EditorData } from '@/store/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';
import print from 'print-js';
import { Notpad } from '@/helpers/notpad';

/**
 * A helper class for performing various editor-related tasks such as opening
 * a new editor, removing an editor, etc.
 */
export class Editors {
  createNew({ content, fileName, fileHandle }: Partial<EditorData> = {}) {
    const newId = genId();
    editors.update((value) => {
      value.push({
        fileName: fileName ?? 'Untitled.txt',
        content: content ?? '',
        id: newId,
        fileHandle
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
      if (value === editorId && removeIndex > 0) {
        return get(editors)[removeIndex - 1]?.id ?? null;
      }
      return value;
    });
  }

  updateContent(id: string, content: string) {
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

  getActive(): EditorData | undefined {
    const activeId = get(activeTabId);
    const editorsList = get(editors);
    return editorsList.find((editor) => editor.id === activeId);
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

  /**
   * Prints active editor.
   */
  printActive = async () => {
    const activeEditor = this.getActive();
    if (!activeEditor) return;
    try {
      print({
        printable: 'textarea',
        type: 'html',
        style: `@import url('https://fonts.googleapis.com/css2?family=SUSE');
        * {
          font-family: 'SUSE', system-ui;
          color: white;
          background-color: black;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        textarea {
          border: none;
          resize: none;
          padding: 8px;
        }
        h1 {
          font-size: 20px;
          padding: 8px;
        }
        `,
        font: 'SUSE',
        header: `${activeEditor.fileName} - Notpad`
      });
    } catch (err) {
      Notpad.showError(err);
      self.print();
    }
  };
}
