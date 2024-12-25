<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import DownloadButtonMenu from '@/components/DownloadMenuButton.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { editors, settings } from '@/store/store';
  import { fade } from 'svelte/transition';
  import { isTauri } from '@/src/lib';
  import screenfull from 'screenfull';
  // import { toggleMode, mode } from 'mode-watcher';
  import { onMount } from 'svelte';
  import { openFontDialog } from '@/components/font-dialog/FontDialog.svelte';
  import { openAboutDialog } from '@/components/AboutDialog.svelte';
  import { toggleGoToDialog } from '@/components/GoToDialog.svelte';
  import { toggleFindDialog } from '@/components/FindDialog.svelte';
  import { openShortcutsDialog } from '@/components/ShortcutsDialog.svelte';
  import InfoIcon from '@/components/icons/Info.svelte';
  import KeyboardIcon from '@/components/icons/Keyboard.svelte';
  import GithubOultineIcon from '@/components/icons/GithubOultine.svelte';
  import CalendarClockIcon from '@/components/icons/CalendarClock.svelte';
  import GoogleLineIcon from '@/components/icons/GoogleLine.svelte';
  import StatusBarIcon from '@/components/icons/StatusBar.svelte';
  import ListOrderedIcon from '@/components/icons/ListOrdered.svelte';
  import WrapTextIcon from '@/components/icons/WrapText.svelte';
  import ALargeSmallIcon from '@/components/icons/ALargeSmall.svelte';
  import LogoutIcon from '@/components/icons/Logout.svelte';

  let innerWidth = $state(window.innerWidth);
  let isFullScreen = $state(screenfull.isFullscreen);

  let isMD = $derived(innerWidth <= 768);
  let tabsMode = $derived($editors.length > 1);
  let singleEditor = $derived($editors.at(0)!);

  onMount(() => {
    screenfull.onchange(() => (isFullScreen = screenfull.isFullscreen));
  });
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10">
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
        Save as...<Menubar.Shortcut>Ctrl+Shift+S</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.fileOptions.print()}>
        Print<Menubar.Shortcut>Ctrl+P</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={Notpad.close}>
        Exit
        <LogoutIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>
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
      <Menubar.Item onclick={() => Notpad.editOptions.delete()}>
        Delete<Menubar.Shortcut>Delete</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={() => Notpad.editOptions.selectAll()}>
        Select All
        <Menubar.Shortcut>Ctrl+A</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={() => Notpad.editOptions.insertDateAndTime()}>
        Time/Date
        <CalendarClockIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Search</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={toggleFindDialog}>
        Find/Replace<Menubar.Shortcut>Ctrl+F</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item onclick={toggleGoToDialog}>
        Go To<Menubar.Shortcut>Ctrl+G</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb()}>
        Search on Google
        <GoogleLineIcon class="ml-auto text-muted-foreground" />
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
        <StatusBarIcon class="ml-auto text-muted-foreground" />
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem
        checked={$settings.lineNumbers}
        onclick={Notpad.viewOptions.toggleLineNumbers}
      >
        Line Numbers
        <ListOrderedIcon class="ml-auto text-muted-foreground" />
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem
        checked={$settings.wrapLines}
        onclick={Notpad.viewOptions.toggleWrapLines}
      >
        Wrap Lines
        <WrapTextIcon class="ml-auto text-muted-foreground" />
      </Menubar.CheckboxItem>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Settings</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={openFontDialog}>
        Font
        <ALargeSmallIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>

      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Theme</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.CheckboxItem>Light</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Dark</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Sepia</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Classic</Menubar.CheckboxItem>
        </Menubar.SubContent>
      </Menubar.Sub>

      <Menubar.Sub>
        <Menubar.SubTrigger>Sound</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.CheckboxItem>None</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Click</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Pop</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Typewriter</Menubar.CheckboxItem>
        </Menubar.SubContent>
      </Menubar.Sub>

      <Menubar.Sub>
        <Menubar.SubTrigger>Vibration</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.CheckboxItem>None</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Low</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Medium</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>High</Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Strong</Menubar.CheckboxItem>
        </Menubar.SubContent>
      </Menubar.Sub>

      <Menubar.Separator />
      <Menubar.Item class="flex items-center gap-2" onclick={openShortcutsDialog}>
        Shortcuts
        <KeyboardIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>
      <a href="https://github.com/Muhammed-Rahif/Notpad" target="_blank">
        <Menubar.Item class="flex items-center gap-2">
          Github
          <GithubOultineIcon class="ml-auto text-muted-foreground" />
        </Menubar.Item>
      </a>
      <Menubar.Item class="flex items-center gap-2" onclick={openAboutDialog}>
        About Notpad
        <InfoIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

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
