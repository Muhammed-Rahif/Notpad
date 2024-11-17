import { get, writable } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import type Quill from 'quill';
import { Delta, Range } from 'quill/core';

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
  /**
   * The selection of the editor.
   */
  selection?: Range;
}

/**
 * Available font families for the editor.
 */
export enum FontFamily {
  SUSE = 'SUSE',
  Baloo2 = 'Baloo 2',
  BricolageGrotesque = 'Bricolage Grotesque',
  Lora = 'Lora',
  RobotoSlab = 'Roboto Slab'
}

export enum FontSize {
  Size6 = 6,
  Size7 = 7,
  Size8 = 8,
  Size9 = 9,
  Size10 = 10,
  Size11 = 11,
  Size12 = 12,
  Size14 = 14,
  Size16 = 16,
  Size18 = 18,
  Size20 = 20,
  Size22 = 22,
  Size24 = 24,
  Size26 = 26,
  Size28 = 28,
  Size36 = 36,
  Size48 = 48,
  Size72 = 72
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
   * Is bottom status bar visible.
   */
  statusBar: boolean;
  /**
   * Is line numbers visible.
   */
  lineNumbers: boolean;
  /**
   * The font family of the editor.
   */
  fontFamily: FontFamily;
  /**
   * The font size of the editor.
   */
  fontSize: FontSize;
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
export const settings = writable<SettingsType>({
  zoom: 1,
  statusBar: true,
  fontFamily: FontFamily.SUSE,
  fontSize: 16,
  lineNumbers: false
});
