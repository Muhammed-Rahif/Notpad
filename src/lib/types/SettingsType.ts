import { Settings } from '@/helpers/settings';

type ElementType<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;

/**
 * Interface representing the settings for the application.
 */
export interface SettingsType {
  /**
   * The zoom level of the application.
   */
  zoom: ElementType<typeof Settings.zooms>;

  /**
   * Is bottom status bar visible.
   */
  statusBar: boolean;

  /**
   * Is line numbers visible.
   */
  lineNumbers: boolean;

  /**
   * Font customizations.
   */
  font: {
    /**
     * The font family of the editor.
     */
    family: ElementType<typeof Settings.fontFamilies>;

    /**
     * The font size of the editor.
     */
    size: ElementType<typeof Settings.fontSizes>;
  };

  /**
   * Theme customizations.
   */
  theme: {
    roundness: ElementType<typeof Settings.theme.roundnesses>;
    preset: ElementType<typeof Settings.theme.presets>;
  };

  /**
   * Should wrap long lines.
   */
  wrapLines: boolean;

  /**
   * Caret's specific configs. Style and Animation. Enable or disable.
   */
  caret: {
    style: ElementType<typeof Settings.caret.styles>;
    animation: keyof typeof Settings.caret.animations;
  };

  /**
   * Typing effect configurations.
   */
  typeEffect: {
    sound: keyof typeof Settings.typeEffect.sounds;
    volume: keyof typeof Settings.typeEffect.volumes;
    vibration: keyof typeof Settings.typeEffect.vibrations;
  };
}
