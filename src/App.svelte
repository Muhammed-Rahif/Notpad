<script lang="ts">
  import MenuBar from '@/components/MenuBar.svelte';
  import EditorTabs from '@/components/EditorTabs.svelte';
  import FontDialog from '@/components/font-dialog/FontDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import favIcon from '@assets/imgs/favicon.png';
  import favIconDark from '@assets/imgs/favicon-dark.png';
  import { mode, ModeWatcher } from 'mode-watcher';
  import { Notpad } from '@/helpers/notpad';
</script>

<!-- Actual UI -->
<div class="flex h-full flex-col">
  <MenuBar />

  {#await Notpad.init() then}
    <EditorTabs />
  {/await}
</div>

<!-- Procedually -->
<FontDialog />
<Shortcuts />
<Toaster />

<ModeWatcher />

<svelte:head>
  {#if $mode == 'dark'}
    <link rel="icon" href={favIconDark} />
  {:else}
    <link rel="icon" href={favIcon} />
  {/if}
</svelte:head>
