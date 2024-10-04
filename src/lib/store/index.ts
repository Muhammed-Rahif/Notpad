import { get, writable } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import type Quill from 'quill';
import { Delta } from 'quill/core';

/**
 * Represents the data associated with an editor.
 */
export interface EditorType {
  /**
   * Name of the textarea (or the file name, label, etc.).
   */
  fileName: string;
  /**
   * The content of the textarea as Quill Delta.
   */
  content: Delta;
  /**
   * Unique ID for the editor.
   */
  id: string;
  /**
   * The file system handle that is used to save without a popup; editing already saved file.
   * Used in desktop browsers.
   */
  fileHandle?: FileSystemFileHandle;
  /**
   * The file path of the file that is being edited.
   * Used in tauri app.
   */
  filePath?: string;
  /**
   * The quill instance associated to this editor. Will not store in indexedDb.
   */
  quill?: Quill;
}

/**
 * Interface representing the settings for the application.
 */
export interface SettingsType {
  /**
   * The zoom level of the application.
   */
  zoom: 0.5 | 0.75 | 0.9 | 1 | 1.2 | 1.5 | 1.75 | 2;
  /**
   * Enable/disable bottom status bar
   */
  statusBar: boolean;
}

/**
 * A writable store that holds an array of `EditorData` objects.
 *
 * @remarks
 * This store is used to manage the state of multiple text editors within the application.
 * Each editor is represented by an `EditorData` object which includes a file name, content, and a unique identifier.
 *
 * @see {@link https://svelte.dev/docs#run-time-svelte-store-writable | Svelte Writable Store}
 */
export const editors = writable<EditorType[]>([
  {
    fileName: 'Untitled.txt',
    content: new Delta(),
    id: genId()
  }
]);

/**
 *  Store the currently active editor id.
 */
export const activeTabId = writable<string>(get(editors).at(0)!.id);

/**
 * A writable store that holds the settings for the application.
 */
export const settings = writable<SettingsType>({ zoom: 1, statusBar: true });
