import { settings } from '@/store/store';
import { type SettingsType } from '@/types/SettingsType';
import clickSound from '@/src/assets/sounds/click.wav';
import beepSound from '@/src/assets/sounds/beep.wav';
import damageSound from '@/src/assets/sounds/damage.wav';
import fistFightSound from '@/src/assets/sounds/fist-fight.wav';
import hitmarkerSound from '@/src/assets/sounds/hitmarker.wav';
import missedPunchSound from '@/src/assets/sounds/missed-punch.wav';
import nkCreamsSound from '@/src/assets/sounds/nk-creams.wav';
import osuSound from '@/src/assets/sounds/osu.wav';
import popSound from '@/src/assets/sounds/pop.wav';
import rubberKeysSound from '@/src/assets/sounds/rubber-keys.wav';
import squareSound from '@/src/assets/sounds/square.wav';
import triangleSound from '@/src/assets/sounds/triangle.wav';
import typewriterSound from '@/src/assets/sounds/typewriter.wav';
import { Notpad } from '@/helpers/notpad';

export class Settings {
  init = () => {
    Notpad.stores.settings.subscribe((settings) => {
      document.documentElement.setAttribute('data-theme', settings.theme);
    });
  };

  static themes = ['light', 'dark', 'sepia', 'classic'] as const;
  static fontFamilies = [
    'SUSE',
    'Baloo 2',
    'Bricolage Grotesque',
    'Lora',
    'Roboto Slab',
    'Inconsolata',
    'Parkinsans'
  ] as const;
  static fontSizes = [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72] as const;
  static zooms = [0.5, 0.75, 0.9, 1, 1.2, 1.5, 1.75, 2] as const;
  static caret = {
    animations: {
      Slow: '600ms',
      Medium: '300ms',
      Fast: '100ms',
      Off: '0ms'
    },
    styles: ['Vertical Bar', 'Block', 'Hollow Block', 'Underline'] as const
  } as const;
  static typeEffect = {
    sounds: {
      Click: clickSound,
      Beep: beepSound,
      Damage: damageSound,
      'Fist Fight': fistFightSound,
      Hitmarker: hitmarkerSound,
      'Missed Punch': missedPunchSound,
      'Nk Creams': nkCreamsSound,
      Osu: osuSound,
      Pop: popSound,
      'Rubber Keys': rubberKeysSound,
      Square: squareSound,
      Triangle: triangleSound,
      Typewriter: typewriterSound,
      None: null
    },
    volumes: {
      None: 0,
      OneQuarter: 0.25,
      Half: 0.5,
      ThreeQuarter: 0.75,
      Full: 1
    },
    vibrations: {
      Strong: 1,
      High: 0.75,
      Medium: 0.5,
      Low: 0.25,
      None: 0
    }
  } as const;

  static defaultSettings: SettingsType = {
    zoom: 1,
    statusBar: true,
    font: {
      family: 'SUSE',
      size: 16
    },
    lineNumbers: false,
    wrapLines: true,
    caret: {
      animation: 'Medium',
      style: 'Vertical Bar'
    },
    typeEffect: {
      sound: 'Nk Creams',
      vibration: 'Medium',
      volume: 'Full'
    },
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  };

  setFontFamily(family: SettingsType['font']['family']) {
    settings.update((value) => ({
      ...value,
      font: {
        ...value.font,
        family
      }
    }));
  }

  setFontSize(size: SettingsType['font']['size']) {
    settings.update((value) => ({
      ...value,
      font: {
        ...value.font,
        size
      }
    }));
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
}
