<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { toggleMode } from 'mode-watcher';
  import EditorTitle from './EditorTitle.svelte';
  import {  editors } from '@/store/store';
  import { fade } from 'svelte/transition';
  import { Notpad } from '@/helpers/notpad';
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

  const menuItems: MenuItems[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
          shortcut: isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N',
          onClick: Notpad.editors.createNew
        },

        { label: 'Open...', shortcut: 'Ctrl+O', onClick: Notpad.file.open },
        {
          label: 'Save',
          shortcut: 'Ctrl+S',
          onClick: Notpad.file.save
        },
        { label: 'Save as...', onClick: () => Notpad.file.save({ saveAs: true }) },

        { type: 'separator' },
        { label: 'Print', shortcut: 'Ctrl+P' },
        { type: 'separator' },
        { label: 'Exit' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z',  onClick: Notpad.editors.undo },
        { label: 'Redo', shortcut: 'Ctrl+Y',  onClick: Notpad.editors.redo},
        { type: 'separator' },
        { label: 'Cut', shortcut: 'Ctrl+X',   onClick: Notpad.editors.cutText },

        { label: 'Copy', shortcut: 'Ctrl+C' },
        { label: 'Paste', shortcut: 'Ctrl+V', onClick: Notpad.editors.pasteText },
        { type: 'separator' },
        { label: 'Select All', shortcut: 'Ctrl+A',  onClick: Notpad.editors.selectAllText   },
        { label: 'Time/Date', shortcut: 'F5', onClick: Notpad.editors.insertDateTime },
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
        { label: 'Full Screen', shortcut: 'F11' },
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
  $: tabsMode = $editors.length > 1; // compact mode will not available on mobile width (w<=450), also on pc when multiple editors.
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
