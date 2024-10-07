import localforage from 'localforage';
import { activeTabId, editors, settings, type EditorType, type SettingsType } from '@/store/store';

export const EDITORS_STORAGE_KEY = 'editors';
export const ACTIVE_TAB_ID_STORAGE_KEY = 'active-tab-id';
export const SETTINGS_STORAGE_KEY = 'settings';

export class NotpadStorage {
  private config = () => {
    localforage.config({
      name: 'Notpad',
      driver: localforage.INDEXEDDB
    });
  };

  private loadStorage = async () => {
    const editorsValue = await localforage.getItem<EditorType[]>(EDITORS_STORAGE_KEY);
    if (editorsValue) editors.set(editorsValue);

    const activeTabIdValue = await localforage.getItem<string>(ACTIVE_TAB_ID_STORAGE_KEY);
    if (activeTabIdValue) activeTabId.set(activeTabIdValue);

    const settingsValue = await localforage.getItem<SettingsType>(SETTINGS_STORAGE_KEY);
    if (settingsValue) settings.set(settingsValue);
  };

  subscribeStoreUpdates = () => {
    editors.subscribe((value) => {
      // Quill instance will not be stored on indexedDb.
      localforage.setItem(
        EDITORS_STORAGE_KEY,
        value.map((edtr) => {
          return { ...edtr, quill: undefined };
        })
      );
    });
    activeTabId.subscribe((value) => {
      localforage.setItem(ACTIVE_TAB_ID_STORAGE_KEY, value);
    });
    settings.subscribe((value) => {
      localforage.setItem(SETTINGS_STORAGE_KEY, value);
    });
  };

  init = async () => {
    this.config();
    await this.loadStorage();
    this.subscribeStoreUpdates();
  };
}
