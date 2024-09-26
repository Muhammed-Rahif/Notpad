<script lang="ts" context="module">
  import MenuBar from '@/components/MenuBar.svelte';
  import Editors from '@/components/Editors.svelte';
  import SaveDialog from '@/components/SaveDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import favIcon from '@/assets/imgs/favicon.png';
  import favIconDark from '@/assets/imgs/favicon-dark.png';
  import { mode, ModeWatcher } from 'mode-watcher';
  import { init } from '@neutralinojs/lib';

  init();
</script>

<!-- Procedually -->
<SaveDialog />
<Shortcuts />

<!-- Actual UI -->
<MenuBar />
<Editors />

<ModeWatcher />

<svelte:head>
  {#if $mode == 'dark'}
    <link rel="icon" href={favIconDark} />
  {:else}
    <link rel="icon" href={favIcon} />
  {/if}
</svelte:head>
