import { settings } from '@/store/store';
import type { FontFamily, FontSize } from '@/types/SettingsTypes';

export class Settings {
  setFontFamily(fontFamily: FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }
}
