import { activeTabId, editors } from '@/store/store';
import { get } from 'svelte/store';
import { findAsyncSequential } from '@/utils';
import { Notpad } from '@/helpers/notpad';
import { isMobile } from '$lib';

/**
 * A helper class for handling file operations such as opening, saving, and saving as.
 * This class is used in the Menubar's file options to manage file interactions.
 */
export class FileOptions {
  /**
   * Opens a file picker dialog for the user to select a text file, reads the file content,
   * and either activates an already opened tab or creates a new tab with the file content.
   *
   * @throws Will show an error message if the file picker dialog fails or file reading encounters an error.
   */
  async open() {
    if (isMobile) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt';
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          if (file.type !== 'text/plain') {
            Notpad.showError(new Error('Please select a text file.'));
            input.remove();
            return;
          }

          const reader = new FileReader();

          reader.onload = (e) => {
            const content = e.target?.result as string;
            Notpad.editors.createNew({
              content,
              fileName: file.name
            });
            input.remove();
          };

          reader.readAsText(file);
        }
      };
      input.click();
    } else
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
          Notpad.editors.createNew({
            fileName: file.name,
            content,
            fileHandle: fileHandle
          });
        }
      } catch (err) {
        Notpad.showError(err);
      }
  }

  /**
   * Saves the current content of the active editor to a file.
   * If `saveAs` is true or no file handle exists, prompts the user to select a file location.
   *
   * @param {Object} options - Options for saving the file.
   * @param {boolean} [options.saveAs] - If true, prompts the user to select a file location.
   *
   * @throws Will throw an error if the save operation fails.
   */
  async save({ saveAs }: { saveAs?: boolean } = {}) {
    const activeEditor = Notpad.editors.getActive();
    if (!activeEditor) return;

    if (isMobile) {
      const blob = new Blob([activeEditor.content], { type: 'text/plain' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav = window.navigator as any;

      if (nav.msSaveOrOpenBlob) {
        nav.msSaveBlob(blob, activeEditor.fileName);
      } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = activeEditor.fileName;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    } else
      try {
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
        Notpad.editors.updateFileHandle(activeEditor.id, fileHandle);
      } catch (err) {
        Notpad.showError(err);
      }
  }
}
