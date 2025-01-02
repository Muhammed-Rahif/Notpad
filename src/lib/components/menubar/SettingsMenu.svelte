<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  // import { toggleMode, mode } from 'mode-watcher';
  import InfoIcon from '@/components/icons/Info.svelte';
  import KeyboardIcon from '@/components/icons/Keyboard.svelte';
  import GithubOultineIcon from '@/components/icons/GithubOultine.svelte';
  import ALargeSmallIcon from '@/components/icons/ALargeSmall.svelte';
  import { Notpad } from '@/helpers/notpad';
  import {
    CaretAnimation,
    CaretStyle,
    TypeEffectSound,
    TypeEffectVibration,
    TypeEffectVolume
  } from '@/types/SettingsType';
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
    <Menubar.CheckboxItem
      checked={$settings.caret.enable}
      onclick={Notpad.settings.toggleCustomCaret}
    >
      Custom Caret
    </Menubar.CheckboxItem>

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
      <Menubar.SubTrigger>Type Effect</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Sub>
          <Menubar.SubTrigger class="gap-2">Sound</Menubar.SubTrigger>
          <Menubar.SubContent>
            {#each Object.keys(TypeEffectSound) as key}
              <Menubar.CheckboxItem
                checked={$settings.typeEffect.sound == key}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({ sound: key as keyof typeof TypeEffectSound });
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
            {#each Object.keys(TypeEffectVolume) as key}
              <Menubar.CheckboxItem
                checked={$settings.typeEffect.volume == key}
                onclick={() => {
                  Notpad.settings.updateTypeEffect({
                    volume: key as keyof typeof TypeEffectVolume
                  });
                }}
              >
                {TypeEffectVolume[key as keyof typeof TypeEffectVolume] * 100}%
              </Menubar.CheckboxItem>
            {/each}
          </Menubar.SubContent>
        </Menubar.Sub>

        {#if 'vibrate' in navigator}
          <Menubar.Sub>
            <Menubar.SubTrigger class="gap-2">Vibration</Menubar.SubTrigger>
            <Menubar.SubContent>
              {#each Object.keys(TypeEffectVibration) as key}
                <Menubar.CheckboxItem
                  checked={$settings.typeEffect.vibration == key}
                  onclick={() => {
                    Notpad.settings.updateTypeEffect({
                      vibration: key as keyof typeof TypeEffectVibration
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

    {#if $settings.caret.enable}
      <Menubar.Sub>
        <Menubar.SubTrigger>Caret</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Sub>
            <Menubar.SubTrigger class="gap-2">Style</Menubar.SubTrigger>
            <Menubar.SubContent>
              {#each Object.keys(CaretStyle) as key}
                <Menubar.CheckboxItem
                  checked={$settings.caret.style == key}
                  onclick={() => {
                    Notpad.settings.updateCaret({ style: key as keyof typeof CaretStyle });
                  }}
                >
                  {key}
                </Menubar.CheckboxItem>
              {/each}
            </Menubar.SubContent>
          </Menubar.Sub>

          <Menubar.Sub>
            <Menubar.SubTrigger class="gap-2">Animation</Menubar.SubTrigger>
            <Menubar.SubContent>
              {#each Object.keys(CaretAnimation) as key}
                <Menubar.CheckboxItem
                  checked={$settings.caret.animation == key}
                  onclick={() => {
                    Notpad.settings.updateCaret({ animation: key as keyof typeof CaretAnimation });
                  }}
                >
                  {key}
                </Menubar.CheckboxItem>
              {/each}
            </Menubar.SubContent>
          </Menubar.Sub>
        </Menubar.SubContent>
      </Menubar.Sub>
    {/if}

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
