<script lang="ts">
  import MenuBar from '@/components/MenuBar.svelte';
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
  import SaveAndQuitDialog from './lib/components/SaveAndQuitDialog.svelte';
  import { onMount } from 'svelte';

  let showSaveAndQuitDialog = true;
  let filename = 'Untitled';

  // Handle the dialog actions
  function handleSave() {
    console.log('File saved.');
    showSaveAndQuitDialog = false;
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  }

  function handleDontSave() {
    console.log('File not saved.');
    showSaveAndQuitDialog = false;
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  }

  function handleCancel() {
    console.log('Action canceled.');
    showSaveAndQuitDialog = false;
  }

  // Handle the beforeunload event
  function beforeUnloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault(); 
    showSaveAndQuitDialog = true;
    event.returnValue = ''; 
  }

  onMount(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  });
</script>

{#await Notpad.init() then}
  <!-- Actual UI -->
  <div class="flex h-full flex-col">
    <MenuBar />
    <EditorTabs />
  </div>

  <!-- Procedually -->
  <SaveAndQuitDialog
    isOpen={showSaveAndQuitDialog}
    {filename}
    on:save={handleSave}
    on:dontsave={handleDontSave}
    on:cancel={handleCancel}
  />

  <FontDialog />
  <LicenseDialog />
  <AboutDialog />
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
