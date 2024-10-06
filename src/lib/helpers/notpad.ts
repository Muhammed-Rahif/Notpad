import { toast } from 'svelte-sonner';
import { FileOptions } from '@/helpers/file-options';
import { Editors } from '@/helpers/editors';
import { NotpadStorage } from '@/store/storage';
import { Settings } from './settings';

export class Notpad {
  public static fileOptions: FileOptions = new FileOptions();
  public static editors: Editors = new Editors();
  public static storage: NotpadStorage = new NotpadStorage();
  public static settings: Settings = new Settings();

  static init = async () => {
    await this.storage.init();
    await this.editors.init();
  };

  static close = () => {
    try {
      window.close();
      toast.info(
        'Closing the Notpad may not work in web browsers due to security restrictions. Please close the tab manually.'
      );
    } catch (err) {
      this.showError(err);
    }
  };

  static showError(err: unknown) {
    if (err instanceof Error) {
      let msg = err.message;
      if (err.name == 'AbortError') return;
      if (err.name == 'NotAllowedError')
        msg = 'Permission denied. Please enable the required permissions to proceed.';

      toast.error(msg);
    } else {
      toast.error('An unknown error occurred');
      console.error(err);
    }
  }
}
