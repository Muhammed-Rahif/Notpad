<script lang="ts">
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
      modifier: window.isNeutralino ? ['ctrl'] : ['ctrl', 'alt'],
      callback: (d) => dispatch(d, NotepadHelper.createNew)
    }
  }}
/>
