<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import { settings } from '@/store/store';
  import screenfull from 'screenfull';
  import { onMount } from 'svelte';
  import StatusBarIcon from '@/components/icons/StatusBar.svelte';
  import ListOrderedIcon from '@/components/icons/ListOrdered.svelte';
  import WrapTextIcon from '@/components/icons/WrapText.svelte';
  let isFullScreen = $state(screenfull.isFullscreen);

  onMount(() => {
    screenfull.onchange(() => (isFullScreen = screenfull.isFullscreen));
  });
</script>

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
