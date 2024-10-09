<script lang="ts">
  import { isTauri } from '$lib';
  import { Notpad } from '@/helpers/notpad';
  import { editors } from '@/store/store';
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  import { openGoToDialog } from './GoToDialog.svelte';
</script>

<svelte:window
  use:shortcut={{
    trigger: [
      {
        key: 'n',
        modifier: ['ctrl', 'alt'],
        callback: () => Notpad.editors.createNew(),
        preventDefault: true
      },
      {
        key: 's',
        modifier: 'ctrl',
        callback: () => Notpad.fileOptions.save(),
        preventDefault: true
      }
    ]
  }}
  use:shortcut={{
    trigger: {
      key: 'o',
      modifier: 'ctrl',
      callback: () => Notpad.fileOptions.open(),
      preventDefault: true
    }
  }}
  use:shortcut={{
    trigger: {
      key: 'p',
      modifier: ['ctrl', 'shift'],
      callback: () => Notpad.fileOptions.print(),
      preventDefault: true
    }
  }}
  use:shortcut={{
    trigger: {
      key: 'f',
      modifier: ['ctrl'],
      callback: () => openGoToDialog(),
      preventDefault: true
    }
  }}
/>
