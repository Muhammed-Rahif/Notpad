<script module>
  import { get, writable } from 'svelte/store';

  const open = writable(false);

  export function toggleGoToDialog() {
    open.set(!get(open));
  }
</script>

<script lang="ts">
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import Label from '@/components/ui/label/label.svelte';
  import { Notpad } from '@/helpers/notpad';

  let line: string | undefined = $state();
  let column: string | undefined = $state();

  function submitGoTo() {
    open.set(false);
    Notpad.searchOptions.goTo({
      line: line ? parseInt(line) : undefined,
      column: column ? parseInt(column) : undefined
    });
  }

  function validateInput(e: Event) {
    // If the input is invalid, reset the value to an empty string

    if (!(e.target as HTMLInputElement).validity.valid) {
      (e.target as HTMLInputElement).value = '';
    }
  }

  $effect(() => {
    if (!$open) Notpad.editors.focus();
  });
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="top-14 translate-y-0">
    <Dialog.Header>
      <Dialog.Title>Go To</Dialog.Title>
    </Dialog.Header>

    <div class="flex gap-3">
      <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label for="line">Line</Label>
        <Input
          bind:value={line}
          type="number"
          id="line"
          placeholder="Line"
          oninput={validateInput}
          step={1}
          min={1}
        />
      </div>

      <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label for="column">Column</Label>
        <Input
          bind:value={column}
          type="number"
          id="column"
          placeholder="Column"
          oninput={validateInput}
          step={1}
          min={0}
        />
      </div>

      <Button type="button" class="mt-auto" onclick={submitGoTo}>Go</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
