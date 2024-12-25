<script lang="ts">
  import MenuBar from '@/src/lib/components/menubar/MenuBar.svelte';
  import EditorTabs from '@/components/EditorTabs.svelte';
  import FontDialog from '@/components/font-dialog/FontDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import favIcon from '@/src/assets/images/favicon.png';
  import favIconDark from '@/src/assets/images/favicon-dark.png';
  import { mode, ModeWatcher } from 'mode-watcher';
  import { Notpad } from '@/helpers/notpad';
  import AboutDialog from '@/components/AboutDialog.svelte';
  import LicenseDialog from '@/components/LicenseDialog.svelte';
  import GoToDialog from '@/components/GoToDialog.svelte';
  import FindDialog from '@/components/FindDialog.svelte';
  import Loading from '@/components/Loading.svelte';
  import ShortcutsDialog from '@/components/ShortcutsDialog.svelte';
  import EditorCloseConfirmationDialog from '@/components/EditorCloseConfirmationDialog.svelte';
</script>

{#await Notpad.init()}
  <Loading />
{:then}
  <!-- What user see on initially -->
  <div class="flex h-full flex-col">
    <MenuBar />
    <EditorTabs />
  </div>

  <!-- Components that aren't appear on initial roll -->
  <EditorCloseConfirmationDialog />
  <FontDialog />
  <LicenseDialog />
  <AboutDialog />
  <ShortcutsDialog />
  <GoToDialog />
  <FindDialog />
  <Shortcuts />
{/await}
<Toaster />
<ModeWatcher />
<svelte:head>
  {#if $mode == 'dark'}
    <link rel="icon" href={favIconDark} />
  {:else}
    <link rel="icon" href={favIcon} />
  {/if}
</svelte:head>
