import { saveDialog } from '@/store/store';

export class NotepadHelper {
  static createNew() {
    saveDialog.set(true);
  }
}
