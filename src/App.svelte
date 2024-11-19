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
  import Loading from '@/components/Loading.svelte';
</script>

{#await Notpad.init()}
  <!-- Loading Animation -->
  <Loading />
{:then}
  <!-- Actual UI -->
  <div class="flex h-full flex-col">
    <MenuBar />
    <EditorTabs />
  </div>

  <!-- Additional Components -->
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
