<script context="module">
  import { writable } from 'svelte/store';
  const open = writable(false);

  export function openFontDialog() {
    open.set(true);
  }
</script>

<script>
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import FontFamilyCombobox from './FontFamilyCombobox.svelte';

  $: console.log(open);
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Font</Dialog.Title>
      <Dialog.Description>
        Select a font from the list below to change the appearance of your text.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <FontFamilyCombobox />
    </div>
    <Dialog.Footer>
      <Button variant="ghost" type="button">Cancel</Button>
      <Button type="submit">Okay</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
