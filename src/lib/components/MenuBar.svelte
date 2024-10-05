<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { editors, activeTabId } from '@/store';
  import { fade } from 'svelte/transition';
  import { isTauri } from '$lib';
  import screenfull from 'screenfull';
  import { toggleMode, mode } from 'mode-watcher';

  // Refined Type Definitions
  interface BaseItem {
    label?: string;
    shortcut?: string;
    onClick?: () => void;
  }

  interface SeparatorItem {
    type: 'separator';
  }

  type Item = BaseItem | SeparatorItem;

  interface MenuItems {
    label: string;
    items: Item[];
  }

  // Menu items definition
  const menuItems: MenuItems[] = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N', onClick: Notpad.editors.createNew },
        { label: 'Open...', shortcut: 'Ctrl+O', onClick: Notpad.fileOptions.open },
        { label: 'Save', shortcut: 'Ctrl+S', onClick: Notpad.fileOptions.save },
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
        { label: 'Find', shortcut: 'Ctrl+F', onClick: () => openSearchDialog('find') },
        { label: 'Find Next', shortcut: 'F3', onClick: () => openSearchDialog('findNext') },
        { label: 'Find Previous', shortcut: 'Shift+F3', onClick: () => openSearchDialog('findPrevious') },
        { label: 'Replace', shortcut: 'Ctrl+H', onClick: () => openSearchDialog('replace') },
        { label: 'Go To', shortcut: 'Ctrl+G', onClick: () => openSearchDialog('goTo') }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: 'Ctrl+Plus' },
        { label: 'Zoom Out', shortcut: 'Ctrl+Minus' },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0' },
        { type: 'separator' },
        { label: 'Full Screen', shortcut: 'F11', onClick: () => screenfull.toggle() },
        { label: 'Mode', onClick: toggleMode }
      ]
    },
    {
      label: 'Help',
      items: [{ label: 'About Notpad' }]
    }
  ];

  // Search dialog state
  let isSearchDialogOpen = false;
  let searchAction = 'find'; // Can be 'find', 'replace', 'findNext', etc.
  let searchText = '';
  let replaceText = '';

  // Open the dialog with a specific action
  function openSearchDialog(action: string) {
    searchAction = action;
    isSearchDialogOpen = true;
  }

  // Close the dialog
  function closeSearchDialog() {
    isSearchDialogOpen = false;
  }

  // Handle find event
  function handleFind(event) {
    searchText = event.detail.searchText;
    performFind();
  }

  // Handle replace event
  function handleReplace(event) {
    searchText = event.detail.searchText;
    replaceText = event.detail.replaceText;
    performReplace();
  }

  // Perform find operation
  function performFind() {
    const editor = $editors.find((editor) => editor.id === $activeTabId);
    if (editor && editor.content.includes(searchText)) {
      alert(`Found: ${searchText}`);
    } else {
      alert('Text not found');
    }
  }

  // Perform replace operation
  function performReplace() {
    const editor = $editors.find((editor) => editor.id === $activeTabId);
    if (editor && editor.content.includes(searchText)) {
      editor.content = editor.content.replace(searchText, replaceText);
      Notpad.editors.updateContent($activeTabId, editor.content);
      alert(`Replaced "${searchText}" with "${replaceText}"`);
    } else {
      alert('Text not found');
    }
  }

  let innerWidth = window.innerWidth;

  $: isXS = innerWidth <= 450;
  $: tabsMode = $editors.length > 1;
  $: singleEditor = $editors.at(0)!;
  $: modeLabel = $mode == 'dark' ? 'Light Mode' : 'Dark Mode';
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10 rounded-sm">
  {#each menuItems as { label, items }}
    <Menubar.Menu>
      <Menubar.Trigger>{label}</Menubar.Trigger>
      <Menubar.Content>
        {#each items as item}
          {#if 'type' in item && item.type === 'separator'}
            <Menubar.Separator />
          {:else if 'label' in item}
            <Menubar.Item on:click={item.onClick}>
              {item.label}
              {#if item.shortcut}
                <Menubar.Shortcut>{item.shortcut}</Menubar.Shortcut>
              {/if}
            </Menubar.Item>
          {/if}
        {/each}
      </Menubar.Content>
    </Menubar.Menu>
  {/each}

  {#if !isXS && !tabsMode}
    <div transition:fade class="max-md:!ml-auto md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      <EditorTitle editor={singleEditor} />
    </div>
  {/if}
</Menubar.Root>

{#if isSearchDialogOpen}
  <!-- Simple search dialog -->
  <div class="dialog-overlay" on:click={closeSearchDialog}>
    <div class="dialog-content" on:click|stopPropagation>
      {#if searchAction === 'find'}
        <h3>Find</h3>
        <input type="text" bind:value={searchText} placeholder="Enter text to find" />
        <button on:click={performFind}>Find</button>
      {/if}

      {#if searchAction === 'replace'}
        <h3>Replace</h3>
        <input type="text" bind:value={searchText} placeholder="Enter text to find" />
        <input type="text" bind:value={replaceText} placeholder="Enter text to replace" />
        <button on:click={performReplace}>Replace</button>
      {/if}

      <button on:click={closeSearchDialog}>Close</button>
    </div>
  </div>
{/if}

<style>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog-content {
    background: white;
    padding: 1rem;
    border-radius: 5px;
  }
</style>
