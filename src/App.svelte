<script lang="ts">
  import MenuBar from '@/components/MenuBar.svelte';
  import EditorTabs from '@/components/EditorTabs.svelte';
  import FontDialog from '@/components/font-dialog/FontDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import favIcon from '@assets/images/favicon.png';
  import favIconDark from '@assets/images/favicon-dark.png';
  import { mode, ModeWatcher } from 'mode-watcher';
  import { Notpad } from '@/helpers/notpad';
  import AboutDialog from '@/components/AboutDialog.svelte';
  import LicenseDialog from '@/components/LicenseDialog.svelte';
  import GoToDialog from '@/components/GoToDialog.svelte';
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
<LicenseDialog />
<AboutDialog />
<GoToDialog />
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
