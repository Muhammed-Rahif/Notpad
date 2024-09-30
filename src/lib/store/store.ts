import { get, writable } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import localforage from 'localforage';

export type EditorData = {
  fileName: string; // Name of the textarea (or the file name, label, etc.)
  content: string; // The content of the textarea
  id: string; // Unique ID for the editor
  fileHandle?: FileSystemFileHandle; // The file system handle that is used to save without a popup; editing already saved file.
};

export const saveDialog = writable(false);
export const editors = writable<EditorData[]>([
  {
    fileName: 'Untitled.txt',
    content: '',
    id: genId()
  }
]);
// Store the currently active editor id
export const activeTabId = writable(get(editors).at(0)!.id);

// Below code are used to storage the store values; if needed
export const EDITORS_STORAGE_KEY = 'editors';
export const ACTIVE_TAB_ID_STORAGE_KEY = 'active-tab-id';

localforage.getItem<EditorData[]>(EDITORS_STORAGE_KEY).then((value) => {
  if (value) {
    editors.set(value);
  }
});
localforage.getItem<string>(ACTIVE_TAB_ID_STORAGE_KEY).then((value) => {
  if (value) {
    activeTabId.set(value);
  }
});

localforage.config({
  name: 'Notpad',
  driver: localforage.INDEXEDDB
});

editors.subscribe((value) => {
  localforage.setItem(EDITORS_STORAGE_KEY, value);
});
activeTabId.subscribe((value) => {
  localforage.setItem(ACTIVE_TAB_ID_STORAGE_KEY, value);
});
