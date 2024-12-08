import type Quill from 'quill';
import type { Delta, Range } from 'quill/core';

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

  isSaved?:boolean;
}
