import { writable, type Writable } from 'svelte/store';

export class Dialogs {
  /**
   * [FontDialog]'s open state.
   */
  public font = writable(false);

  /**
   * [AboutDialog]'s open state.
   */
  public about = writable(false);

  /**
   * [FindDialog]'s open state.
   */
  public find = writable(false);

  /**
   * [GoToDialog]'s open state.
   */
  public goTo = writable(false);

  /**
   * [LicenseDialog]'s open state.
   */
  public license = writable(false);

  /**
   * [ShortcutsDialog]'s open state.
   */
  public shortcuts = writable(false);

  /**
   * A writable store for the editor confirmation dialos open state.
   * - `false`: dialog closed.
   * - `string`: id of the closing editor.
   */
  public editorCloseConfirmation = writable<false | string>();

  public toggle(writableStore: Writable<boolean>) {
    writableStore.update((value) => !value);
  }

  public open(writableStore: Writable<boolean>) {
    writableStore.set(true);
  }

  public close(writableStore: Writable<boolean>) {
    writableStore.set(false);
  }
}
