<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import DownloadButton from '@/components/DownloadButton.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { editors, settings } from '@/store/store';
  import { fade } from 'svelte/transition';
  import { isTauri } from '@/src/lib';
  import screenfull from 'screenfull';
  import { toggleMode, mode } from 'mode-watcher';
  import { onMount } from 'svelte';
  import { openFontDialog } from '@/components/font-dialog/FontDialog.svelte';
  import { openAboutDialog } from '@/components/AboutDialog.svelte';
  import { toggleGoToDialog } from '@/components/GoToDialog.svelte';
  import { toggleFindDialog } from '@/components/FindDialog.svelte';
  import { openShortcutsDialog } from '@/src/lib/components/ShortcutsDialog.svelte';
  import InfoIcon from './icons/Info.svelte';
  import KeyboardIcon from '@/components/icons/Keyboard.svelte';
  import GithubOultineIcon from './icons/GithubOultine.svelte';

  let innerWidth = $state(window.innerWidth);
  let isFullScreen = $state(screenfull.isFullscreen);

  let isXS = $derived(innerWidth <= 450);
  let tabsMode = $derived($editors.length > 1);
  let singleEditor = $derived($editors.at(0)!);

  onMount(() => {
    screenfull.onchange(() => (isFullScreen = screenfull.isFullscreen));
  });
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10 rounded-none">
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={() => Notpad.editors.createNew()}>
        New<Menubar.Shortcut>{isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N'}</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={Notpad.fileOptions.open}>
        Open...<Menubar.Shortcut>Ctrl+O</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.fileOptions.save()}>
        Save<Menubar.Shortcut>Ctrl+S</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.fileOptions.save({ saveAs: true })}>
        Save as...
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={() => Notpad.fileOptions.print()}>
        Print<Menubar.Shortcut>Ctrl+P</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={Notpad.close}>Exit</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={() => Notpad.editOptions.undo()}>
        Undo<Menubar.Shortcut>Ctrl+Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.editOptions.redo()}>
        Redo<Menubar.Shortcut>Ctrl+Y</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={() => Notpad.editOptions.cut()}>
        Cut<Menubar.Shortcut>Ctrl+X</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.editOptions.copy()}>
        Copy<Menubar.Shortcut>Ctrl+C</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.editOptions.paste()}>
        Paste<Menubar.Shortcut>Ctrl+V</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={() => Notpad.editOptions.selectAll()}>
        Select All
        <Menubar.Shortcut>Ctrl+A</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.editOptions.insertDateAndTime()}>Time/Date</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={openFontDialog}>Font</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Search</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb()}>
        Search on Google
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={toggleFindDialog}>
        Find/Replace<Menubar.Shortcut>Ctrl+F</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={toggleGoToDialog}>
        Go To<Menubar.Shortcut>Ctrl+G</Menubar.Shortcut>
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Sub>
        <Menubar.SubTrigger>Zoom</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item onclick={() => Notpad.viewOptions.zoom('in')}>
            Zoom In<Menubar.Shortcut>Ctrl+Plus</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item onclick={() => Notpad.viewOptions.zoom('out')}>
            Zoom Out<Menubar.Shortcut class="ml-3">Ctrl+Minus</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item onclick={() => Notpad.viewOptions.zoom('reset')}>
            Reset Zoom<Menubar.Shortcut>Ctrl+0</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>

      <Menubar.Separator />
      <Menubar.CheckboxItem checked={isFullScreen} onclick={() => screenfull.toggle()}>
        Full Screen
        <Menubar.Shortcut>F11</Menubar.Shortcut>
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem
        checked={$settings.statusBar}
        onclick={Notpad.viewOptions.toggleStatusBar}
      >
        Status Bar
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem
        checked={$settings.lineNumbers}
        onclick={Notpad.viewOptions.toggleLineNumbers}
      >
        Line Numbers
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem checked={$mode == 'dark'} onclick={toggleMode}>
        Dark Mode
      </Menubar.CheckboxItem>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Help</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item class="flex items-center gap-2" onclick={openShortcutsDialog}>
        <KeyboardIcon class="text-xl" />
        Shortcuts
      </Menubar.Item>
      <Menubar.Separator />
      <a href="https://github.com/Muhammed-Rahif/Notpad" target="_blank">
        <Menubar.Item class="flex items-center gap-2">
          <GithubOultineIcon class="text-xl" />
          Github
        </Menubar.Item>
      </a>
      <Menubar.Item class="flex items-center gap-2" onclick={openAboutDialog}>
        <InfoIcon class="text-xl" />
        About Notpad
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  {#if !isTauri}
    <DownloadButton />
  {/if}

  {#if !isXS && !tabsMode}
    <div
      transition:fade
      class="max-md:!ml-auto md:absolute md:left-1/2
      md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <EditorTitle editor={singleEditor} />
    </div>
  {/if}
</Menubar.Root>
