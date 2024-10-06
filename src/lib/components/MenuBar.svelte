<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { editors, settings } from '@/store';
  import { fade } from 'svelte/transition';
  import { isTauri } from '$lib';
  import screenfull from 'screenfull';
  import { toggleMode, mode } from 'mode-watcher';
  import { onMount } from 'svelte';
  import { openFontDialog } from './font-dialog/FontDialog.svelte';

  let innerWidth = window.innerWidth;
  let isFullScreen = screenfull.isFullscreen;

  $: isXS = innerWidth <= 450;
  $: tabsMode = $editors.length > 1;
  $: singleEditor = $editors.at(0)!;
  $: modeLabel = $mode == 'dark' ? 'Light Mode' : 'Dark Mode';

  onMount(() => {
    screenfull.onchange(() => (isFullScreen = screenfull.isFullscreen));
  });
</script>

<svelte:window bind:innerWidth />

<Menubar.Root class="relative z-10 rounded-sm">
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item on:click={() => Notpad.editors.createNew()}>
        New<Menubar.Shortcut>{isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N'}</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={Notpad.fileOptions.open}>
        Open...<Menubar.Shortcut>Ctrl+O</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.fileOptions.save()}>
        Save<Menubar.Shortcut>Ctrl+S</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.fileOptions.save({ saveAs: true })}>
        Save as...
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item on:click={() => Notpad.editors.print()}>
        Print<Menubar.Shortcut>Ctrl+P</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item on:click={Notpad.close}>Exit</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item on:click={() => Notpad.editors.undo()}>
        Undo<Menubar.Shortcut>Ctrl+Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.editors.redo()}>
        Redo<Menubar.Shortcut>Ctrl+Y</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item on:click={() => Notpad.editors.cut()}>
        Cut<Menubar.Shortcut>Ctrl+X</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.editors.copy()}>
        Copy<Menubar.Shortcut>Ctrl+C</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.editors.paste()}>
        Paste<Menubar.Shortcut>Ctrl+V</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item on:click={() => Notpad.editors.selectAll()}>
        Select All
        <Menubar.Shortcut>Ctrl+A</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item on:click={() => Notpad.editors.insertDateAndTime()}>Time/Date</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item on:click={openFontDialog}>Font</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Search</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Sub>
        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Search the web</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Find<Menubar.Shortcut>Ctrl+F</Menubar.Shortcut></Menubar.Item>
          <Menubar.Item>Find Next<Menubar.Shortcut>F3</Menubar.Shortcut></Menubar.Item>
          <Menubar.Item>
            Find Previous
            <Menubar.Shortcut class="ml-3">Shift+F3</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Item>Replace<Menubar.Shortcut>Ctrl+H</Menubar.Shortcut></Menubar.Item>
      <Menubar.Item>Go To<Menubar.Shortcut>Ctrl+G</Menubar.Shortcut></Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Sub>
        <Menubar.SubTrigger>Zoom</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Zoom In<Menubar.Shortcut>Ctrl+Plus</Menubar.Shortcut></Menubar.Item>
          <Menubar.Item>
            Zoom Out<Menubar.Shortcut class="ml-3">Ctrl+Minus</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>Reset Zoom<Menubar.Shortcut>Ctrl+0</Menubar.Shortcut></Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>

      <Menubar.Separator />
      <Menubar.CheckboxItem bind:checked={isFullScreen} on:click={() => screenfull.toggle()}>
        Full Screen
        <Menubar.Shortcut>F11</Menubar.Shortcut>
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem
        bind:checked={$settings.statusBar}
        on:click={Notpad.settings.toggleStatusBar}
      >
        Status Bar
      </Menubar.CheckboxItem>
      <Menubar.CheckboxItem checked={$mode == 'dark'} on:click={toggleMode}>
        Dark Mode
      </Menubar.CheckboxItem>
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Help</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>About Notpad</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>

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
