<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import DownloadButtonMenu from '@/components/DownloadMenuButton.svelte';
  import { editors } from '@/store/store';
  import { fade } from 'svelte/transition';
  import { isTauri } from '@/src/lib';
  import FileMenu from './FileMenu.svelte';
  import EditMenu from './EditMenu.svelte';
  import SearchMenu from './SearchMenu.svelte';
  import ViewMenu from './ViewMenu.svelte';
  import SettingsMenu from './SettingsMenu.svelte';

  let innerWidth = $state(window.innerWidth);

  let isMD = $derived(innerWidth <= 768);
  let tabsMode = $derived($editors.length > 1);
  let singleEditor = $derived($editors.at(0)!);
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10">
  <FileMenu />
  <EditMenu />
  <SearchMenu />
  <ViewMenu />
  <SettingsMenu />

  {#if !isMD && !tabsMode}
    <div
      transition:fade
      class="!ml-auto lg:absolute lg:left-1/2 lg:top-1/2
      lg:-translate-x-1/2 lg:-translate-y-1/2"
    >
      <EditorTitle editor={singleEditor} />
    </div>
  {/if}

  {#if !isTauri}
    <DownloadButtonMenu />
  {/if}
</Menubar.Root>
