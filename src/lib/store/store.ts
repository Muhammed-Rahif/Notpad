import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import localforage from 'localforage';

export type EditorData = {
  title: string; // Name of the textarea (or the file name, label, etc.)
  content: string; // The content of the textarea
  id: string; // Unique ID for the editor
};

export const saveDialog = writable(false);
export const editors = writable<EditorData[]>([
  {
    title: 'Untitled.txt',
    content: '',
    id: uuidv4()
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
  name: 'Notepad',
  driver: localforage.INDEXEDDB
});

editors.subscribe((value) => {
  localforage.setItem(EDITORS_STORAGE_KEY, value);
});
activeTabId.subscribe((value) => {
  localforage.setItem(ACTIVE_TAB_ID_STORAGE_KEY, value);
});
