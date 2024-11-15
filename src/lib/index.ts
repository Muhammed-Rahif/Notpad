/**
 * A constant that determines if the application is running as a Tauri app.
 * Taken from https://github.com/tauri-apps/tauri/discussions/6119#discussioncomment-9956625.
 *
 * @constant {boolean}
 */
export const isTauri = '__TAURI_INTERNALS__' in window;

/**
 * A constant that determines if the application is running on the web.
 * It is true if the application is not running as a Tauri app.
 *
 * @constant {boolean}
 */
export const isWeb = !isTauri;

/**
 * A constant that determines if the application is running on a mobile device.
 * It checks if the device has touch points, which indicates a mobile device.
 * This can be used to conditionally render or execute code specific to mobile environments.
 *
 * @constant {boolean}
 */
export const isMobile = navigator.maxTouchPoints > 0;

/**
 * A constant that determines if the application is running on a desktop.
 * It is true if the application is not running on a mobile device.
 *
 * @constant {boolean}
 */
export const isDesktop = !isMobile;

/**
 * A constant that determines if the application is running on a mobile device as a Tauri app.
 * It is true if the application is running as a Tauri app and on a mobile device.
 *
 * @constant {boolean}
 */
export const isTauriMobile = isTauri && isMobile;

/**
 * A constant that determines if the application is running on a desktop as a Tauri app.
 * It is true if the application is running as a Tauri app and on a desktop.
 *
 * @constant {boolean}
 */
export const isTauriDesktop = isTauri && isDesktop;

/**
 * A constant that determines if the application is running on a mobile device in the web browser.
 * It is true if the application is running in the web browser and on a mobile device.
 *
 * @constant {boolean}
 */
export const isWebMobile = isWeb && isMobile;

/**
 * A constant that determines if the application is running on a desktop in the web browser.
 * It is true if the application is running in the web browser and on a desktop.
 *
 * @constant {boolean}
 */
export const isWebDesktop = isWeb && isDesktop;
