<script lang="ts">
  import MenuBar from '@/components/menubar/MenuBar.svelte';
  import EditorTabs from '@/components/EditorTabs.svelte';
  import FontDialog from '@/components/font-dialog/FontDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import { Toaster } from '@/components/ui/sonner';
  import { Notpad } from '@/helpers/notpad';
  import AboutDialog from '@/components/AboutDialog.svelte';
  import LicenseDialog from '@/components/LicenseDialog.svelte';
  import GoToDialog from '@/components/GoToDialog.svelte';
  import FindDialog from '@/components/FindDialog.svelte';
  import Loading from '@/components/Loading.svelte';
  import ShortcutsDialog from '@/components/ShortcutsDialog.svelte';
  import EditorCloseConfirmationDialog from '@/components/EditorCloseConfirmationDialog.svelte';
  import DynamicFavicon from '@/components/DynamicFavicon.svelte';

  let isLoading = $state(true);

  Notpad.init().then(() => {
    isLoading = false;
  });
</script>

<DynamicFavicon />

{#if isLoading}
  <Loading />
{:else}
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
  <Toaster />
{/if}
