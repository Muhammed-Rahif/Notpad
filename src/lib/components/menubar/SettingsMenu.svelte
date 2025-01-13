<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  // import { toggleMode, mode } from 'mode-watcher';
  import InfoIcon from '@/components/icons/Info.svelte';
  import KeyboardIcon from '@/components/icons/Keyboard.svelte';
  import GithubOultineIcon from '@/components/icons/GithubOultine.svelte';
  import ALargeSmallIcon from '@/components/icons/ALargeSmall.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { Settings } from '@/helpers/settings';

  const settings = Notpad.stores.settings;
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
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Preset</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.theme.presets as preset}
              <Menubar.CheckboxItem
                checked={$settings.theme.preset == preset}
                onclick={() => {
                  Notpad.settings.updateTheme({ preset: preset });
                }}
                class="capitalize"
              >
                {preset}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Roundness</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(Settings.theme.roundnesses) as roundness}
              <Menubar.CheckboxItem
                checked={$settings.theme.roundness == roundness}
                onclick={() => {
                  Notpad.settings.updateTheme({
                    roundness: roundness as keyof typeof Settings.theme.roundnesses
                  });
                }}
                class="capitalize"
              >
                {roundness}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Sub>
      <Menubar.SubTrigger>Type Effect</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Sound</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(Settings.typeEffect.sounds) as sound}
              <Menubar.CheckboxItem
                class="capitalize"
                checked={$settings.typeEffect.sound == sound}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({
                    sound: sound as keyof typeof Settings.typeEffect.sounds
                  });
                }}
              >
                {sound.replace('-', ' ')}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Volume</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.typeEffect.volumes as volume}
              <Menubar.CheckboxItem
                checked={$settings.typeEffect.volume == volume}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({ volume });
                }}
              >
                {volume * 100}%
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        {#if 'vibrate' in navigator}
          <Menubar.Sub>
            <Menubar.SubTrigger class="gap-2">Vibration</Menubar.SubTrigger>
            <Menubar.SubContent>
              {#each Object.keys(Settings.typeEffect.vibrations) as vibration}
                <Menubar.CheckboxItem
                  class="capitalize"
                  checked={$settings.typeEffect.vibration == vibration}
                  onclick={() => {
                    Notpad.settings.updateTypeEffect({
                      vibration: vibration as keyof typeof Settings.typeEffect.vibrations
                    });
                  }}
                >
                  {vibration}
                </Menubar.CheckboxItem>
              {/each}
            </Menubar.SubContent>
          </Menubar.Sub>
        {/if}
      </Menubar.SubContent>
    </Menubar.Sub>

    <Menubar.Sub>
      <Menubar.SubTrigger>Caret</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Style</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.caret.styles as style}
              <Menubar.CheckboxItem
                class="capitalize"
                checked={$settings.caret.style == style}
                onclick={() => {
                  Notpad.settings.updateCaret({ style });
                }}
              >
                {style.replace('-', ' ')}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Animation</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(Settings.caret.animations) as animation}
              <Menubar.CheckboxItem
                class="capitalize"
                checked={$settings.caret.animation == animation}
                onclick={() => {
                  Notpad.settings.updateCaret({
                    animation: animation as keyof typeof Settings.caret.animations
                  });
                }}
              >
                {animation}
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
