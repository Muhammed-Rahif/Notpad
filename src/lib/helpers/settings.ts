import { settings } from '@/store';
import { get } from 'svelte/store';

export class Settings {
  toggleStatusBar() {
    settings.update((value) => ({ ...value, statusBar: !get(settings).statusBar }));
  }
}
