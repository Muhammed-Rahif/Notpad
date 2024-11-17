import { activeTabId, editors, settings } from '@/store/store';
import { get } from 'svelte/store';
import { findAsyncSequential } from '@/utils';
import { Notpad } from '@/helpers/notpad';
import { open, save } from '@tauri-apps/plugin-dialog';
import { isMobile, isTauri } from '@/src/lib';
import { readTextFile, BaseDirectory, exists, writeTextFile } from '@tauri-apps/plugin-fs';
import { toast } from 'svelte-sonner';
import { Delta } from 'quill/core';
import print from 'print-js';
import { mode } from 'mode-watcher';

/**
 * A helper class for handling file operations such as opening, saving, and saving as.
 * This class is used in the Menubar's file options to manage file interactions.
 */
export class FileOptions {
  /**
   * Desktop browsers implementation of opening a file.
   */
  private openFileInDesktopBrowser = async () => {
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
        content: new Delta({
          ops: [
            {
              insert: content
            }
          ]
        }),
        fileHandle: fileHandle
      });
    }
  };

  /**
   * Opening file implementation that works accross all devices.
   */
  private openFileLegacy = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.type !== 'text/plain') {
          input.remove();
          throw new Error('Please select a text file.');
        }

        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          Notpad.editors.createNew({
            content: new Delta({
              ops: [
                {
                  insert: content
                }
              ]
            }),
            fileName: file.name
          });
          input.remove();
        };

        reader.readAsText(file);
      }
    };
    input.click();
  };

  /**
   * Tauri implementation of opening a file.
   * This method uses the Tauri API to open a file picker dialog.
   */
  private openFileInTauri = async () => {
    const filePath = await open({
      multiple: false,
      filters: [{ name: 'Text Documents', extensions: ['txt'] }]
    });
    if (Array.isArray(filePath) || filePath === null) return;

    if (!(await exists(filePath, { baseDir: BaseDirectory.AppData })))
      throw new Error('File not found');

    const content = await readTextFile(filePath, { baseDir: BaseDirectory.AppConfig });
    Notpad.editors.createNew({
      content: new Delta({
        ops: [
          {
            insert: content
          }
        ]
      }),
      fileName: filePath.split('/').pop() as string,
      filePath
    });
  };

  private saveFileInDesktopBrowser = async (saveAs?: boolean) => {
    const activeEditor = Notpad.editors.getActive();
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
    await writable.write(activeEditor.quill!.getText());
    await writable.close();
    Notpad.editors.updateFileHandle(activeEditor.id, fileHandle);
  };

  /**
   * Saving file implementation that works accross all devices.
   */
  private saveFileLegacy = async () => {
    const activeEditor = Notpad.editors.getActive();
    if (!activeEditor) return;

    const blob = new Blob([activeEditor.quill!.getText()], { type: 'text/plain' });
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
  };

  /**
   * Tauri implementation of saving a file.
   */
  private saveFileInTauri = async (saveAs?: boolean) => {
    const activeEditor = Notpad.editors.getActive();
    if (!activeEditor) return;

    let filePath: string | null | undefined = activeEditor.filePath;

    if (saveAs || !filePath) {
      const savePath = await save({
        title: 'Save File',
        defaultPath: activeEditor.fileName,
        filters: [
          {
            name: 'Text Documents',
            extensions: ['txt']
          }
        ]
      });
      if (filePath === null) return;
      filePath = savePath;
    }

    if (filePath) {
      await writeTextFile(filePath, activeEditor.quill!.getText(), {
        baseDir: BaseDirectory.AppConfig
      });
      Notpad.editors.updateFilePath(activeEditor.id, filePath);

      toast.success(`File saved to ${filePath}`);
    }
  };

  /**
   * Opens a file picker dialog for the user to select a text file, reads the file content,
   * and either activates an already opened tab or creates a new tab with the file content.
   *
   * @throws Will show an error message if the file picker dialog fails or file reading encounters an error.
   */
  open = async () => {
    try {
      if (isTauri) await this.openFileInTauri();
      else await this.openFileInDesktopBrowser();
    } catch (err) {
      console.error(err);
      await this.openFileLegacy();
    }
  };

  /**
   * Saves the current content of the active editor to a file.
   * If `saveAs` is true or no file handle exists, prompts the user to select a file location.
   *
   * @param {Object} options - Options for saving the file.
   * @param {boolean} [options.saveAs] - If true, prompts the user to select a file location.
   *
   * @throws Will throw an error if the save operation fails.
   */
  save = async ({ saveAs }: { saveAs?: boolean } = {}) => {
    try {
      if (isTauri) await this.saveFileInTauri(saveAs);
      else await this.saveFileInDesktopBrowser(saveAs);
    } catch (err) {
      console.error(err);
      await this.saveFileLegacy();
    }
  };

  /**
   * Prints active editor.
   */
  print = async (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    const isDarkMode = get(mode) == 'dark';
    const fontFamily = get(settings).fontFamily;

    if (!editor) return;
    try {
      print({
        printable: editor.quill?.root.innerHTML,
        type: 'raw-html',
        style: `@import url('https://fonts.googleapis.com/css2?family=${fontFamily}');
        * {
          font-family: ${fontFamily}, system-ui;
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
