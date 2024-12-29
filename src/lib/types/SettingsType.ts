import clickSound from '@/src/assets/sounds/click.wav';

/**
 * Available font families for the editor.
 */
export const FontFamily = {
  SUSE: 'SUSE',
  Baloo2: 'Baloo 2',
  BricolageGrotesque: 'Bricolage Grotesque',
  Lora: 'Lora',
  RobotoSlab: 'Roboto Slab',
  Inconsolata: 'Inconsolata',
  Parkinsans: 'Parkinsans'
};

export const FontSize = {
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 11,
  '12': 12,
  '14': 14,
  '16': 16,
  '18': 18,
  '20': 20,
  '22': 22,
  '24': 24,
  '26': 26,
  '28': 28,
  '36': 36,
  '48': 48,
  '72': 72
};

export const CaretAnimation = {
  Slow: '600ms',
  Medium: '300ms',
  Fast: '100ms',
  Off: '0ms'
};

export const CaretStyle = {
  VerticalBar: '|',
  Block: '▮',
  HollowBlock: '▯',
  Underline: '_'
};

export const TypeEffectSound = {
  Click: clickSound,
  Pop: clickSound,
  None: null
};

export const TypeEffectVolume = {
  None: 0,
  OneQuarter: 0.25,
  Half: 0.5,
  ThreeQuarter: 0.75,
  Full: 1
};

export const TypeEffectVibration = {
  Strong: 1,
  High: 0.75,
  Medium: 0.5,
  Low: 0.25,
  None: 0
};

/**
 * Interface representing the settings for the application.
 */
export interface SettingsType {
  /**
   * The zoom level of the application.
   */
  zoom: 0.5 | 0.75 | 0.9 | 1 | 1.2 | 1.5 | 1.75 | 2;
  /**
   * Is bottom status bar visible.
   */
  statusBar: boolean;
  /**
   * Is line numbers visible.
   */
  lineNumbers: boolean;
  /**
   * The font family of the editor.
   */
  fontFamily: keyof typeof FontFamily;
  /**
   * The font size of the editor.
   */
  fontSize: keyof typeof FontSize;
  /**
   * Should wrap long lines.
   */
  wrapLines: boolean;
  /**
   * Caret's specific configs. Style and Animation. Enable or disable.
   */
  caret: {
    style: keyof typeof CaretStyle;
    animation: keyof typeof CaretAnimation;
    enable: boolean;
  };
  /**
   * Typing effect configurations.
   */
  typeEffect: {
    sound: keyof typeof TypeEffectSound;
    volume: keyof typeof TypeEffectVolume;
    vibration: keyof typeof TypeEffectVibration;
  };
}
