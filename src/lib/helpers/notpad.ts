import { toast } from 'svelte-sonner';
import { FileOptions } from '@/helpers/file-options';
import { Editors } from '@/helpers/editors';

export class Notpad {
  public static fileOptions: FileOptions = new FileOptions();
  public static editors: Editors = new Editors();

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
