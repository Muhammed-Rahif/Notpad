import { settings } from '@/store/store';
import {
  CaretAnimation,
  CaretStyle,
  FontFamily,
  FontSize,
  type SettingsType
} from '@/types/SettingsType';

export class Settings {
  static defaultSettings: SettingsType = {
    zoom: 1,
    statusBar: true,
    fontFamily: FontFamily.SUSE,
    fontSize: FontSize.Size16,
    lineNumbers: false,
    wrapLines: true,
    caret: {
      animation: CaretAnimation.Medium,
      style: CaretStyle.VerticalBar
    }
  };

  setFontFamily(fontFamily: FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }

  updateCaret(caret: Partial<SettingsType['caret']>) {
    settings.update((value) => ({
      ...value,
      caret: { ...value.caret, ...caret }
    }));
  }
}
