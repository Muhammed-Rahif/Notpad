import { activeTabId, editors, type EditorData } from '@/store/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';
import { findAsyncSequential } from '@/utils';

export class NotpadHelper {
  static createNew({ content, fileName, fileHandle }: Partial<EditorData> = {}) {
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

  static async openFile() {
    try {
      const [fileHandle] = await showOpenFilePicker({
        multiple: false,
        excludeAcceptAllOption: true,
        types: [
          {
            description: 'Text Documents (*.txt)',
            accept: {
              'text/plain': ['.txt']
            }
          }
        ]
      });

      const file = await fileHandle.getFile();
      const content = await file.text();

      const alreadyOpened = await findAsyncSequential(get(editors), async (edtr) => {
        if (!edtr.fileHandle) return false;
        return await fileHandle.isSameEntry(edtr.fileHandle);
      });

      if (alreadyOpened) {
        activeTabId.set(alreadyOpened.id);
      } else {
        NotpadHelper.createNew({
          fileName: file.name,
          content,
          fileHandle: fileHandle
        });
      }
    } catch (err) {
      NotpadHelper.showError(err);
    }
  }

  static remove(id: string) {
    let i = 0;
    let removeIndex = -1;
    editors.update((value) => {
      return value.filter((editor) => {
        if (editor.id == id) removeIndex = i;
        i++;
        return editor.id !== id;
      });
    });

    activeTabId.update((value) => {
      if (value === id && removeIndex > 0) {
        return get(editors)[removeIndex - 1]?.id ?? null;
      }
      return value;
    });
  }

  static updateContent(id: string, content: string) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === id) {
          editor.content = content;
        }
        return editor;
      });
    });
  }

  static updateFileName(editorId: string, fileName: string) {
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

  static getActiveEditor(): EditorData | undefined {
    const activeId = get(activeTabId);
    const editorsList = get(editors);
    return editorsList.find((editor) => editor.id === activeId);
  }

  static updateFileHandle(id: string, fileHandle: FileSystemFileHandle) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === id) {
          return { ...e, fileHandle, fileName: fileHandle.name };
        }
        return e;
      });
    });
  }

  static async saveFile({ saveAs }: { saveAs?: boolean } = {}) {
    try {
      const activeEditor = NotpadHelper.getActiveEditor();
      if (!activeEditor) return;

      let fileHandle: FileSystemFileHandle | undefined = activeEditor.fileHandle;
      if (saveAs || !fileHandle)
        fileHandle = await showSaveFilePicker({
          id: activeEditor.id,
          suggestedName: activeEditor.fileName,
          excludeAcceptAllOption: true,
          types: [
            {
              description: 'Text Documents (*.txt)',
              accept: {
                'text/plain': ['.txt']
              }
            }
          ]
        });

      const writable = await fileHandle.createWritable();
      await writable.write(activeEditor.content);
      await writable.close();
      NotpadHelper.updateFileHandle(activeEditor.id, fileHandle);
    } catch (err) {
      NotpadHelper.showError(err);
    }
  }

  static showError(err: unknown) {
    if (err instanceof Error) {
      if (err.name == 'AbortError') return;
      toast.error(err.message);
    } else {
      toast.error('An unknown error occurred');
    }
  }
}
