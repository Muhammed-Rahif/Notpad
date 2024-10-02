import localforage from 'localforage';
import { activeTabId, editors, settings, type EditorData, type Settings } from '@/store';

export const EDITORS_STORAGE_KEY = 'editors';
export const ACTIVE_TAB_ID_STORAGE_KEY = 'active-tab-id';
export const SETTINGS_STORAGE_KEY = 'settings';

localforage.config({
  name: 'Notpad',
  driver: localforage.INDEXEDDB
});

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
localforage.getItem<Settings>(SETTINGS_STORAGE_KEY).then((value) => {
  if (value) {
    settings.set(value);
  }
});

editors.subscribe((value) => {
  localforage.setItem(EDITORS_STORAGE_KEY, value);
});
activeTabId.subscribe((value) => {
  localforage.setItem(ACTIVE_TAB_ID_STORAGE_KEY, value);
});
settings.subscribe((value) => {
  localforage.setItem(SETTINGS_STORAGE_KEY, value);
});
