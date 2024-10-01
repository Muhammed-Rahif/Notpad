import { toast } from 'svelte-sonner';
import { FileOptions } from './file-options';
import { NotpadEditors } from './notpad-editors';

export class Notpad {
  public static file: FileOptions = new FileOptions();
  public static editors: NotpadEditors = new NotpadEditors();

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
