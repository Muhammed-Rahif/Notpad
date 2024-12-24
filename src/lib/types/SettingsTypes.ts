/**
 * Available font families for the editor.
 */
export enum FontFamily {
  SUSE = 'SUSE',
  Baloo2 = 'Baloo 2',
  BricolageGrotesque = 'Bricolage Grotesque',
  Lora = 'Lora',
  RobotoSlab = 'Roboto Slab',
  Inconsolata = 'Inconsolata',
  Parkinsans = 'Parkinsans'
}

export enum FontSize {
  Size6 = 6,
  Size7 = 7,
  Size8 = 8,
  Size9 = 9,
  Size10 = 10,
  Size11 = 11,
  Size12 = 12,
  Size14 = 14,
  Size16 = 16,
  Size18 = 18,
  Size20 = 20,
  Size22 = 22,
  Size24 = 24,
  Size26 = 26,
  Size28 = 28,
  Size36 = 36,
  Size48 = 48,
  Size72 = 72
}

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
  fontFamily: FontFamily;
  /**
   * The font size of the editor.
   */
  fontSize: FontSize;
  /**
   * Should wrap long lines.
   */
  wrapLongLines: boolean;
}
