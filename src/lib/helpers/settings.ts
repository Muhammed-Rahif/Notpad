import { settings } from '@/store/store';
import { FontFamily, FontSize, type SettingsType } from '@/types/SettingsType';

export class Settings {
  static defaultSettings: SettingsType = {
    zoom: 1,
    statusBar: true,
    fontFamily: 'SUSE',
    fontSize: '16',
    lineNumbers: false,
    wrapLines: true,
    caret: {
      animation: 'Medium',
      style: 'VerticalBar',
      enable: true
    },
    typeEffect: {
      sound: 'Click',
      vibration: 'Medium',
      volume: 'ThreeQuarter'
    }
  };

  setFontFamily(fontFamily: keyof typeof FontFamily) {
    settings.update((value) => ({ ...value, fontFamily }));
  }

  setFontSize(fontSize: keyof typeof FontSize) {
    settings.update((value) => ({ ...value, fontSize }));
  }

  updateCaret(caret: Partial<SettingsType['caret']>) {
    settings.update((value) => ({
      ...value,
      caret: { ...value.caret, ...caret }
    }));
  }

  updateTypeEffect(typeEffect: Partial<SettingsType['typeEffect']>) {
    settings.update((value) => ({
      ...value,
      typeEffect: { ...value.typeEffect, ...typeEffect }
    }));
  }

  toggleCustomCaret() {
    settings.update((value) => ({
      ...value,
      caret: { ...value.caret, enable: !value.caret.enable }
    }));
  }
}
