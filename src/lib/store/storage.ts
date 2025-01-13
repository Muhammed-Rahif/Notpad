import localforage from 'localforage';
import type { EditorType } from '@/types/EditorType';
import type { SettingsType } from '@/src/lib/types/SettingsType';
import { Editors } from '@/helpers/editors';
import { Settings } from '@/helpers/settings';
import merge from 'lodash.merge';
import { Notpad } from '@/helpers/notpad';

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

  private loadSettingsValues = async () => {
    /**
     * A little hack: [localStorage] is sync and indexedDB isn't so that
     * the theme takes a time to load; to prevent this.
     */
    const localStoragePreset = localStorage.getItem('theme-preset');
    if (localStoragePreset)
      document.documentElement.setAttribute('data-theme-preset', localStoragePreset);

    const settingsValue = await localforage.getItem<SettingsType>(SETTINGS_STORAGE_KEY);
    // Adding default values to the settings if they are not present
    // on in any circumstances if new values are introduced in the future.
    if (settingsValue) {
      const settingsValueRefined = merge(Settings.defaultSettings, settingsValue);
      Notpad.stores.settings.set(settingsValueRefined);

      document.documentElement.setAttribute('data-theme-preset', settingsValueRefined.theme.preset);
      document.documentElement.style.setProperty(
        '--theme-roundness',
        `${Settings.theme.roundnesses[settingsValueRefined.theme.roundness]}rem`
      );
    }

    Notpad.stores.settings.subscribe((settings) => {
      localforage.setItem(SETTINGS_STORAGE_KEY, settings);
      localStorage.setItem('theme-preset', settings.theme.preset);

      document.documentElement.setAttribute('data-theme-preset', settings.theme.preset);
      document.documentElement.style.setProperty(
        '--theme-roundness',
        `${Settings.theme.roundnesses[settings.theme.roundness]}rem`
      );
    });
  };

  private loadActiveTabIdValue = async () => {
    const activeTabIdValue = await localforage.getItem<string>(ACTIVE_TAB_ID_STORAGE_KEY);
    if (activeTabIdValue) {
      Notpad.stores.activeTabId.set(activeTabIdValue);
    }

    Notpad.stores.activeTabId.subscribe((value) => {
      localforage.setItem(ACTIVE_TAB_ID_STORAGE_KEY, value);
    });
  };

  private loadEditorsValues = async () => {
    const editorsValue = await localforage.getItem<EditorType[]>(EDITORS_STORAGE_KEY);
    if (editorsValue) {
      // Adding default values to the editors if they are not present
      // on in any circumstances if new values are introduced in the future.
      const editorsValueRefined = editorsValue.map((editor) => {
        const { id, content, ...rest } = editor;
        const defaultValue = { ...Editors.defaultEditor, id, content };
        return merge(defaultValue, rest);
      });
      Notpad.stores.editors.set(editorsValueRefined);
    }

    Notpad.stores.editors.subscribe((value) => {
      // Quill instance will not be stored on indexedDb.
      localforage.setItem(
        EDITORS_STORAGE_KEY,
        value.map((edtr) => {
          return { ...edtr, quill: undefined };
        })
      );
    });
  };

  init = async () => {
    this.config();
    await Promise.all([
      this.loadSettingsValues(),
      this.loadActiveTabIdValue(),
      this.loadEditorsValues()
    ]);
  };
}
