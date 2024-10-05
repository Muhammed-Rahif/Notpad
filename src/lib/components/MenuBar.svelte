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
        { label: 'Find Next', shortcut: 'F3', onClick: () => findNext() },
        { label: 'Find Previous', shortcut: 'Shift+F3', onClick: () => findPrevious() },
        { label: 'Replace -all', shortcut: 'Ctrl+H', onClick: () => openSearchDialog('replace') },
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
  let matches: number[] = []; // To store indices of matches
  let currentMatchIndex = -1; // To track the current match index

  // Open the dialog with a specific action
  function openSearchDialog(action: string) {
    searchAction = action;
    isSearchDialogOpen = true;
    currentMatchIndex = -1; // Reset the match index when opening dialog
  }

  // Close the dialog
  function closeSearchDialog() {
    isSearchDialogOpen = false;
    searchText = ''; // Clear search text when closing
    replaceText = ''; // Clear replace text when closing
    matches = []; // Clear matches
    currentMatchIndex = -1; // Reset match index
    clearHighlights(); // Clear highlights when closing
  }

  // Clear highlights in the editor
  function clearHighlights() {
    const editor = $editors.find((editor) => editor.id === $activeTabId);
    if (editor) {
      editor.content = editor.content.replace(/<mark>(.*?)<\/mark>/g, '$1'); // Remove highlights
      Notpad.editors.updateContent($activeTabId, editor.content);
    }
  }

  // Perform find operation
  function performFind() {
    const editor = $editors.find((editor) => editor.id === $activeTabId);
    if (editor) {
      clearHighlights(); // Clear previous highlights
      matches = [...editor.content.matchAll(new RegExp(searchText, 'g'))].map(match => match.index || 0);
      if (matches.length > 0) {
        currentMatchIndex = 0; // Start from the first match
        highlightMatches(editor);
        alert(`Found ${matches.length} occurrences of "${searchText}".`);
      } else {
        alert('Text not found');
      }
    }
    closeSearchDialog(); // Close dialog after the action
  }

  // Highlight all matches in the editor
  function highlightMatches(editor) {
    const highlightedContent = editor.content.replace(new RegExp(`(${searchText})`, 'g'), '<mark>$1</mark>');
    Notpad.editors.updateContent($activeTabId, highlightedContent);
  }

  // Find Next functionality
  function findNext() {
    if (matches.length > 0) {
      currentMatchIndex = (currentMatchIndex + 1) % matches.length; // Wrap around to the start
      const editor = $editors.find((editor) => editor.id === $activeTabId);
      alert(`Match found: "${searchText}" at index ${matches[currentMatchIndex]}. Occurrence: ${currentMatchIndex + 1} of ${matches.length}`);
    } else {
      alert('No matches found. Please perform a search first.');
    }
  }

  // Find Previous functionality
  function findPrevious() {
    if (matches.length > 0) {
      currentMatchIndex = (currentMatchIndex - 1 + matches.length) % matches.length; // Wrap around to the end
      const editor = $editors.find((editor) => editor.id === $activeTabId);
      alert(`Match found: "${searchText}" at index ${matches[currentMatchIndex]}. Occurrence: ${currentMatchIndex + 1} of ${matches.length}`);
    } else {
      alert('No matches found. Please perform a search first.');
    }
  }

  // Perform replace operation
  function performReplace() {
    const editor = $editors.find((editor) => editor.id === $activeTabId);
    if (editor && editor.content.includes(searchText)) {
      editor.content = editor.content.replace(new RegExp(searchText, 'g'), replaceText);
      Notpad.editors.updateContent($activeTabId, editor.content);
      alert(`Replaced all occurrences of "${searchText}" with "${replaceText}"`);
    } else {
      alert('Text not found');
    }
    closeSearchDialog(); // Close dialog after the action
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
  <div class="editor-overlay" on:click={closeSearchDialog}>
    <div class="dialog-overlay" on:click|stopPropagation>
      <div class="dialog-content">
        {#if searchAction === 'find'}
          <h3>Find</h3>
          <input type="text" bind:value={searchText} placeholder="Enter text to find" />
          <button on:click={performFind}>Find</button>
          <button on:click={closeSearchDialog}>Close</button>
        {:else if searchAction === 'replace'}
          <h3>Replace</h3>
          <input type="text" bind:value={searchText} placeholder="Enter text to find" />
          <input type="text" bind:value={replaceText} placeholder="Enter text to replace" />
          <button on:click={performReplace}>Replace</button>
          <button on:click={closeSearchDialog}>Close</button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .editor-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
  }

  .dialog-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1002;
  }
  
  mark {
    background-color: red; /* Highlight color */
  }
</style>
