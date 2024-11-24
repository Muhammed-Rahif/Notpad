<script module>
  import { get, writable } from 'svelte/store';
  const open = writable(false);

  export function openFontDialog() {
    open.set(true);
  }
</script>

<script lang="ts">
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import FontFamilyCombobox from './FontFamilyCombobox.svelte';
  import { settings } from '@/store/store';
  import { Notpad } from '@/helpers/notpad';
  import FontSizeCombobox from './FontSizeCombobox.svelte';
  import { Label } from '@/components/ui/label';
  import * as Card from '@/components/ui/card';
  import { FontFamily, FontSize } from '@/types/SettingsTypes';

  const currentSettings = get(settings);

  let fontFamily: FontFamily = $state(currentSettings.fontFamily);
  let fontSize: FontSize = $state(currentSettings.fontSize);

  function closeFontDialog({ submit } = { submit: false }) {
    open.set(false);
    if (submit) {
      Notpad.settings.setFontFamily(fontFamily);
      Notpad.settings.setFontSize(fontSize);
    }
    Notpad.editors.focus();
  }

  function resetFontDefault() {
    fontFamily = FontFamily.SUSE;
    fontSize = FontSize.Size16;
  }
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
    <Dialog.Header>
      <Dialog.Title>Font</Dialog.Title>
      <Dialog.Description>
        Select a font family and size from the list below to change the appearance of your text.
      </Dialog.Description>
    </Dialog.Header>

    <div class="flex gap-3 py-4 max-[464px]:flex-col">
      <FontFamilyCombobox bind:value={fontFamily} />
      <FontSizeCombobox bind:value={fontSize} />
    </div>

    <Card.Root id="sample-font" class="relative">
      <Label for="sample-font" class="absolute left-3 top-0 -translate-y-1/2 bg-background px-2">
        Sample
      </Label>
      <Card.Content>
        <p style={`font-size: ${fontSize}px; font-family: ${fontFamily}`}>Card Content</p>
      </Card.Content>
    </Card.Root>

    <Dialog.Footer class="gap-2">
      <Button variant="ghost" class="mr-auto max-sm:w-full" onclick={resetFontDefault}>
        Reset
      </Button>
      <Button variant="secondary" onclick={() => closeFontDialog()}>Cancel</Button>
      <Button onclick={() => closeFontDialog({ submit: true })}>Okay</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
