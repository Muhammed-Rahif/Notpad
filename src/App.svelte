<script lang="ts">
  import MenuBar from '@/components/menubar/MenuBar.svelte';
  import EditorTabs from '@/components/EditorTabs.svelte';
  import FontDialog from '@/components/font-dialog/FontDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import favIconLight from '@/src/assets/images/favicon-light.png';
  import favIconDark from '@/src/assets/images/favicon-dark.png';
  import { Notpad } from '@/helpers/notpad';
  import AboutDialog from '@/components/AboutDialog.svelte';
  import LicenseDialog from '@/components/LicenseDialog.svelte';
  import GoToDialog from '@/components/GoToDialog.svelte';
  import FindDialog from '@/components/FindDialog.svelte';
  import Loading from '@/components/Loading.svelte';
  import ShortcutsDialog from '@/components/ShortcutsDialog.svelte';
  import EditorCloseConfirmationDialog from '@/components/EditorCloseConfirmationDialog.svelte';
  import { get } from 'svelte/store';

  const settings = Notpad.stores.settings;
  document.documentElement.setAttribute('data-theme-mode', get(settings).theme.mode);
  document.documentElement.setAttribute('data-theme-color', get(settings).theme.color);
  document.documentElement.style.setProperty(
    '--theme-roundness',
    `${get(settings).theme.roundness}rem`
  );
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

<svelte:head>
  {#if $settings.theme.mode == 'dark'}
    <link rel="icon" href={favIconDark} />
  {:else}
    <link rel="icon" href={favIconLight} />
  {/if}
</svelte:head>
