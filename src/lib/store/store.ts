import { get, writable } from 'svelte/store';
import type { EditorType } from '@/types/EditorTypes';
import { type SettingsType } from '@/src/lib/types/SettingsType';
import { Settings } from '@/helpers/settings';
import { Editors } from '@/helpers/editors';

/**
 * A writable store that holds an array of `EditorData` objects.
 *
 * @remarks
 * This store is used to manage the state of multiple text editors within the application.
 * Each editor is represented by an `EditorData` object which includes a file name, content, and a unique identifier.
 *
 * @see {@link https://svelte.dev/docs#run-time-svelte-store-writable | Svelte Writable Store}
 */
export const editors = writable<EditorType[]>([Editors.defaultEditor]);

/**
 *  Store the currently active editor id.
 */
export const activeTabId = writable<string>(get(editors).at(0)!.id);

/**
 * A writable store that holds the settings for the application.
 */
export const settings = writable<SettingsType>(Settings.defaultSettings);
