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
import { get } from 'svelte/store';

export class Settings {
  init = () => {
    Notpad.stores.settings.subscribe((settings) => {
      document.documentElement.setAttribute('data-theme-preset', settings.theme.preset);
      document.documentElement.style.setProperty(
        '--theme-roundness',
        `${Settings.theme.roundnesses[settings.theme.roundness]}rem`
      );
    });

    const settings = get(Notpad.stores.settings);
    document.documentElement.setAttribute('data-theme-preset', settings.theme.preset);
    document.documentElement.style.setProperty(
      '--theme-roundness',
      `${Settings.theme.roundnesses[settings.theme.roundness]}rem`
    );
  };

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
      slow: '600ms',
      medium: '300ms',
      fast: '100ms',
      off: '0ms'
    },
    styles: ['vertical-bar', 'block', 'hollow-block', 'underline'] as const
  } as const;
  static typeEffect = {
    sounds: {
      click: clickSound,
      beep: beepSound,
      damage: damageSound,
      'fist-fight': fistFightSound,
      hitmarker: hitmarkerSound,
      'missed-punch': missedPunchSound,
      'nk-creams': nkCreamsSound,
      osu: osuSound,
      pop: popSound,
      'rubber-keys': rubberKeysSound,
      square: squareSound,
      triangle: triangleSound,
      typewriter: typewriterSound,
      none: null
    },
    volumes: [0, 0.25, 0.5, 0.75, 1],
    vibrations: {
      strong: 1,
      high: 0.75,
      medium: 0.5,
      low: 0.25,
      none: 0
    }
  } as const;
  static theme = {
    roundnesses: {
      none: 0,
      low: 0.3,
      medium: 0.5,
      high: 0.75,
      full: 1,
      extra: 1.3
    },
    presets: ['light', 'dark', 'pixie', 'cosmic', 'kelp', 'coral']
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
      animation: 'medium',
      style: 'vertical-bar'
    },
    typeEffect: {
      sound: 'nk-creams',
      vibration: 'medium',
      volume: 1
    },
    theme: {
      roundness: 'medium',
      preset: 'light'
    }
  };

  updateFont(font: SettingsType['font']) {
    Notpad.stores.settings.update((value) => ({
      ...value,
      font: { ...value.font, ...font }
    }));
  }

  updateTheme(theme: Partial<SettingsType['theme']>) {
    Notpad.stores.settings.update((value) => ({
      ...value,
      theme: { ...value.theme, ...theme }
    }));
  }

  updateCaret(caret: Partial<SettingsType['caret']>) {
    Notpad.stores.settings.update((value) => ({
      ...value,
      caret: { ...value.caret, ...caret }
    }));
  }

  updateTypeEffect(typeEffect: Partial<SettingsType['typeEffect']>) {
    Notpad.stores.settings.update((value) => ({
      ...value,
      typeEffect: { ...value.typeEffect, ...typeEffect }
    }));
  }
}
