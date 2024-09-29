<script lang="ts">
  import { isTauri } from '$lib';
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function dispatch(d: ShortcutEventDetail, cb: () => void) {
    d.originalEvent.preventDefault();
    return cb();
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'n',
      modifier: isTauri ? ['ctrl'] : ['ctrl', 'alt'],
      callback: (d) => dispatch(d, NotepadHelper.createNew)
    }
  }}
  use:shortcut={{
    trigger: {
      key: 'o',
      modifier: ['ctrl'],
      callback: (d) => dispatch(d, NotepadHelper.openFile)
    }
  }}
/>
