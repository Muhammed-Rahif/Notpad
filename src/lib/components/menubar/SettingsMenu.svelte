<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  // import { toggleMode, mode } from 'mode-watcher';
  import InfoIcon from '@/components/icons/Info.svelte';
  import KeyboardIcon from '@/components/icons/Keyboard.svelte';
  import GithubOultineIcon from '@/components/icons/GithubOultine.svelte';
  import ALargeSmallIcon from '@/components/icons/ALargeSmall.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { CaretAnimation, CaretStyle } from '@/types/SettingsType';
  import { settings } from '@/store/store';
</script>

<Menubar.Menu>
  <Menubar.Trigger>Settings</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item onclick={() => Notpad.dialogs.font.set(true)}>
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
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Effect</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.CheckboxItem>None</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Click</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Pop</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Typewriter</Menubar.CheckboxItem>
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Volume</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.CheckboxItem>100%</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>75%</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>50%</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>25%</Menubar.CheckboxItem>
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Vibration</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.CheckboxItem>None</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Low</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Medium</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>High</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Strong</Menubar.CheckboxItem>
          </Menubar.SubContent>
        </Menubar.Sub>
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Sub>
      <Menubar.SubTrigger>Caret</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Style</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.values(CaretStyle) as caretStyle}
              <Menubar.CheckboxItem
                checked={$settings.caret.style == caretStyle}
                onclick={() => Notpad.settings.updateCaret({ style: caretStyle })}
              >
                {caretStyle}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Animation</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.values(CaretAnimation) as caretAnimation}
              <Menubar.CheckboxItem
                checked={$settings.caret.animation == caretAnimation}
                onclick={() => Notpad.settings.updateCaret({ animation: caretAnimation })}
              >
                {caretAnimation}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Separator />
    <Menubar.Item
      class="flex items-center gap-2"
      onclick={() => Notpad.dialogs.shortcuts.set(true)}
    >
      Shortcuts
      <KeyboardIcon class="ml-auto text-muted-foreground" />
    </Menubar.Item>
    <a href="https://github.com/Muhammed-Rahif/Notpad" target="_blank">
      <Menubar.Item class="flex items-center gap-2">
        Github
        <GithubOultineIcon class="ml-auto text-muted-foreground" />
      </Menubar.Item>
    </a>
    <Menubar.Item class="flex items-center gap-2" onclick={() => Notpad.dialogs.about.set(true)}>
      About Notpad
      <InfoIcon class="ml-auto text-muted-foreground" />
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
