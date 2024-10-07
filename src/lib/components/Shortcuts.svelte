<script lang="ts">
  import { isTauri } from '$lib';
  import { Notpad } from '@/helpers/notpad';
  import { editors } from '@/store/store';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function dispatch(d: ShortcutEventDetail, cb: () => void) {
    d.originalEvent.preventDefault();
    return cb();
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: [
      {
        key: 'n',
        modifier: ['ctrl', 'alt'],
        callback: (d) => dispatch(d, Notpad.editors.createNew)
      },
      {
        key: 's',
        modifier: 'ctrl',
        callback: (d) => dispatch(d, Notpad.fileOptions.save)
      }
    ]
  }}
  use:shortcut={{
    trigger: {
      key: 'o',
      modifier: 'ctrl',
      callback: (d) => dispatch(d, Notpad.fileOptions.open)
    }
  }}
  use:shortcut={{
    trigger: {
      key: 'p',
      modifier: ['ctrl', 'shift'],
      callback: (d) => dispatch(d, Notpad.editors.print)
    }
  }}
/>
