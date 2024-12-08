import { settings } from '@/store/store';
import { FontFamily, FontSize, type SettingsType } from '@/types/SettingsTypes';

export class Settings {
  static defaultSettings: SettingsType = {
    zoom: 1,
    statusBar: true,
    fontFamily: FontFamily.SUSE,
    fontSize: FontSize.Size16,
    lineNumbers: false,
  };

  setFontFamily(fontFamily: FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }
}
