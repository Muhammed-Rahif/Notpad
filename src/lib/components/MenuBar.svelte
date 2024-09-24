<script lang="ts">
  import * as Menubar from '$lib/components/ui/menubar';
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { isElectron } from '@/utils';
  import { toggleMode } from 'mode-watcher';
  import EditorTitle from './EditorTitle.svelte';
  import { editors } from '@/store/store';
  import { fade } from 'svelte/transition';

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
          shortcut: isElectron() ? 'Ctrl+N' : 'Ctrl+Alt+N',
          onClick: NotepadHelper.createNew
        },
        { label: 'Open...', shortcut: 'Ctrl+O' },
        { label: 'Save', shortcut: 'Ctrl+S' },
        { label: 'Save as...' },
        { type: 'separator' },
        { label: 'Print', shortcut: 'Ctrl+P' },
        { type: 'separator' },
        { label: 'Exit' }
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
        { label: 'Full Screen', shortcut: 'F11' },
        { label: 'Dark Mode', onClick: toggleMode }
      ]
    },
    {
      label: 'Help',
      items: [{ label: 'About Notepad' }]
    }
  ];

  $: isSingleEditor = $editors.length == 1;
  $: singleEditorId = $editors.at(0)!.id;
  $: singleEditorTitle = $editors.at(0)!.title;
</script>

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

  {#if isSingleEditor}
    <div
      transition:fade
      class="max-md:!ml-auto max-md:pr-3 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <EditorTitle id={singleEditorId} title={singleEditorTitle} />
    </div>
  {/if}
</Menubar.Root>
