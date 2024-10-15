import { FontFamily, FontSize, settings } from '@/store/store';

export class Settings {
  setFontFamily(fontFamily: FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }
}
