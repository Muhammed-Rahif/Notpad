import { FontFamily, FontSize, settings } from '@/store/store';
import { get } from 'svelte/store';

export class Settings {
  toggleStatusBar() {
    settings.update((value) => ({ ...value, statusBar: !get(settings).statusBar }));
  }

  setFontFamily(fontFamily: FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }
}
