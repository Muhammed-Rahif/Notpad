import { get, writable } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { Delta } from 'quill/core';
import type { EditorType } from '@/types/EditorTypes';
import { FontFamily, type SettingsType } from '@/types/SettingsTypes';

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
