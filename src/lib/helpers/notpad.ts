import { toast } from 'svelte-sonner';
import { FileOptions } from '@/helpers/file-options';
import { Editors } from '@/helpers/editors';
import { NotpadStorage } from '@/store/storage';
import { Settings } from '@/helpers/settings';
import { EditOptions } from '@/helpers/edit-options';
import { GithubApi } from '@/helpers/github-api';
import { SearchOptions } from '@/helpers/search-options';
import { ViewOptions } from '@/helpers/view-options';

export class Notpad {
  public static fileOptions: FileOptions = new FileOptions();
  public static editOptions: EditOptions = new EditOptions();
  public static editors: Editors = new Editors();
  public static storage: NotpadStorage = new NotpadStorage();
  public static settings: Settings = new Settings();
  public static github: GithubApi = new GithubApi();
  public static searchOptions: SearchOptions = new SearchOptions();
  public static viewOptions: ViewOptions = new ViewOptions();

  public static init = async () => {
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
    } else if (typeof err === 'string') {
      toast.error(err);
    } else {
      toast.error(`An unknown error occurred: ${err}`);
      console.error(err);
    }
  }
}
