<script lang="ts">
  import * as Menubar from '$lib/components/ui/menubar';
  import { toggleMode } from 'mode-watcher';

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
        { label: 'New', shortcut: 'Ctrl+N' },
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
            <Menubar.Item on:click={onClick}
              >{label}
              {#if shortcut}
                <Menubar.Shortcut>{shortcut}</Menubar.Shortcut>
              {/if}
            </Menubar.Item>
          {/if}
        {/each}
      </Menubar.Content>
    </Menubar.Menu>
  {/each}
</Menubar.Root>
