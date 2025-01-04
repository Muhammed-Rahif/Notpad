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
          <Menubar.SubTrigger class="gap-2">Mode</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.theme.modes as mode}
              <Menubar.CheckboxItem
                checked={$settings.theme.mode == mode}
                onclick={() => {
                  Notpad.settings.updateTheme({ mode });
                }}
                class="capitalize"
              >
                {mode}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Color</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.theme.colors as color}
              <Menubar.CheckboxItem
                checked={$settings.theme.color == color}
                onclick={() => {
                  Notpad.settings.updateTheme({ color: color });
                }}
                class="capitalize"
              >
                {color}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Roundness</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Settings.theme.roundnesses as roundness}
              <Menubar.CheckboxItem
                checked={$settings.theme.roundness == roundness}
                onclick={() => {
                  Notpad.settings.updateTheme({ roundness: roundness });
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
            {#each Object.keys(Settings.typeEffect.sounds) as key}
              <Menubar.CheckboxItem
                checked={$settings.typeEffect.sound == key}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({
                    sound: key as keyof typeof Settings.typeEffect.sounds
                  });
                }}
              >
                {key}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Volume</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(Settings.typeEffect.volumes) as key}
              <Menubar.CheckboxItem
                checked={$settings.typeEffect.volume == key}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({
                    volume: key as keyof typeof Settings.typeEffect.volumes
                  });
                }}
              >
                {Settings.typeEffect.volumes[key as keyof typeof Settings.typeEffect.volumes] *
                  100}%
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        {#if 'vibrate' in navigator}
          <Menubar.Sub>
            <Menubar.SubTrigger class="gap-2">Vibration</Menubar.SubTrigger>
            <Menubar.SubContent>
              {#each Object.keys(Settings.typeEffect.vibrations) as key}
                <Menubar.CheckboxItem
                  checked={$settings.typeEffect.vibration == key}
                  onclick={() => {
                    Notpad.settings.updateTypeEffect({
                      vibration: key as keyof typeof Settings.typeEffect.vibrations
                    });
                  }}
                >
                  {key}
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
                checked={$settings.caret.style == style}
                onclick={() => {
                  Notpad.settings.updateCaret({ style });
                }}
              >
                {style}
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Animation</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(Settings.caret.animations) as key}
              <Menubar.CheckboxItem
                checked={$settings.caret.animation == key}
                onclick={() => {
                  Notpad.settings.updateCaret({
                    animation: key as keyof typeof Settings.caret.animations
                  });
                }}
              >
                {key}
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
