import { get } from 'svelte/store';
import { Notpad } from '@/helpers/notpad';
import type { SettingsType } from '@/src/lib/types/SettingsType';

export class ViewOptions {
  public toggleStatusBar() {
    Notpad.stores.settings.update((value) => ({
      ...value,
      statusBar: !get(Notpad.stores.settings).statusBar
    }));
  }

  public toggleLineNumbers() {
    Notpad.editors.focus();
    Notpad.stores.settings.update((value) => ({
      ...value,
      lineNumbers: !get(Notpad.stores.settings).lineNumbers
    }));
  }

  public toggleWrapLines() {
    Notpad.editors.focus();
    Notpad.stores.settings.update((value) => ({
      ...value,
      wrapLines: !get(Notpad.stores.settings).wrapLines
    }));
  }

  public zoom(zoom: 'in' | 'out' | 'reset') {
    const zoomSettings = get(Notpad.stores.settings).zoom;
    const zoomLevels: SettingsType['zoom'][] = [0.5, 0.75, 0.9, 1, 1.2, 1.5, 1.75, 2];

    let newZoom: SettingsType['zoom'];

    if (zoom === 'reset') {
      newZoom = 1;
    } else {
      const currentIndex = zoomLevels.indexOf(zoomSettings);

      if (zoom === 'in' && currentIndex < zoomLevels.length - 1) {
        newZoom = zoomLevels[currentIndex + 1];
      } else if (zoom === 'out' && currentIndex > 0) {
        newZoom = zoomLevels[currentIndex - 1];
      } else {
        newZoom = zoomSettings;
      }
    }

    Notpad.stores.settings.update((value) => ({ ...value, zoom: newZoom }));
  }
}
