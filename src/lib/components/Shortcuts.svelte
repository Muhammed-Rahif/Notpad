<script lang="ts">
  import { Notpad } from '@/helpers/notpad';
  import { shortcut } from '@svelte-put/shortcut';
  import { toggleGoToDialog } from '@/components/GoToDialog.svelte';
  import { toggleFindDialog } from '@/components/FindDialog.svelte';
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
      key: 'g',
      modifier: ['ctrl'],
      callback: () => toggleGoToDialog(),
      preventDefault: true
    }
  }}
  use:shortcut={{
    trigger: {
      key: 'f',
      modifier: ['ctrl'],
      callback: () => toggleFindDialog(),
      preventDefault: true
    }
  }}
/>
