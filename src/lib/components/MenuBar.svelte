<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { editors } from '@/store';
  import { toggleMode } from 'mode-watcher';
  import { fade } from 'svelte/transition';
  import { isTauri } from '$lib';

  interface MenuItems {
    label: string;
    items: Item[];
  }

  interface Item {
    label?: string;
    shortcut?: string;
    type?: string;
    onClick?: () => void;
  }

  const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

  const menuItems: MenuItems[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          shortcut: isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N',
          onClick: Notpad.editors.createNew
        },

        { label: 'Open...', shortcut: 'Ctrl+O', onClick: Notpad.fileOptions.open },
        {
          label: 'Save',
          shortcut: 'Ctrl+S',
          onClick: Notpad.fileOptions.save
        },
        { label: 'Save as...', onClick: () => Notpad.fileOptions.save({ saveAs: true }) },

        { type: 'separator' },
        { label: 'Print', shortcut: 'Ctrl+P', onClick: Notpad.editors.printActive },
        { type: 'separator' },
        { label: 'Exit', onClick: Notpad.close }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z' },
        { label: 'Redo', shortcut: 'Ctrl+Y' },
        { type: 'separator' },
        { label: 'Cut', shortcut: 'Ctrl+X' },
        { label: 'Copy', shortcut: 'Ctrl+C' },
        { label: 'Paste', shortcut: 'Ctrl+V' },
        { type: 'separator' },
        { label: 'Select All', shortcut: 'Ctrl+A' },
        { label: 'Time/Date', shortcut: 'F5' },
        { type: 'separator' },
        { label: 'Font' }
      ]
    },
    {
      label: 'Search',
      items: [
        { label: 'Find', shortcut: 'Ctrl+F' },
        { label: 'Find Next', shortcut: 'F3' },
        { label: 'Find Previous', shortcut: 'Shift+F3' },
        { label: 'Replace', shortcut: 'Ctrl+H' },
        { label: 'Go To', shortcut: 'Ctrl+G' }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: 'Ctrl+Plus' },
        { label: 'Zoom Out', shortcut: 'Ctrl+Minus' },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0' },
        { type: 'separator' },
        {
        label: 'Full Screen',shortcut: 'F11', onClick: toggleFullscreen },
        { label: 'Dark Mode', onClick: toggleMode }
      ]
    },
    {
      label: 'Help',
      items: [{ label: 'About Notpad' }]
    }
  ];

  let innerWidth = window.innerWidth;

  $: isXS = innerWidth <= 450;
  /**
   * Compact mode is disabled on mobile devices (width <= 450px)
   * and on PCs when multiple editors are open.
   */
  $: tabsMode = $editors.length > 1;
  $: singleEditor = $editors.at(0)!;
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10 rounded-sm">
  {#each menuItems as { label, items }}
    <Menubar.Menu>
      <Menubar.Trigger>{label}</Menubar.Trigger>
      <Menubar.Content>
        {#each items as { label, shortcut, type, onClick }}
          {#if type === 'separator'}
            <Menubar.Separator />
          {:else}
            <Menubar.Item on:click={onClick}>
              {label}
              {#if shortcut}
                <Menubar.Shortcut>{shortcut}</Menubar.Shortcut>
              {/if}
            </Menubar.Item>
          {/if}
        {/each}
      </Menubar.Content>
    </Menubar.Menu>
  {/each}

  {#if !isXS && !tabsMode}
    <div
      transition:fade
      class="max-md:!ml-auto md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <EditorTitle editor={singleEditor} />
    </div>
  {/if}
</Menubar.Root>
