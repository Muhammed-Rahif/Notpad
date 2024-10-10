<script context="module">
  import { writable } from 'svelte/store';

  const open = writable(true);

  export function openFindDialog() {
    open.set(true);
  }
</script>

<script lang="ts">
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import { Notpad } from '@/helpers/notpad';
  import { Toggle } from '@/components/ui/toggle';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import ChevronUp from '@/components/icons/ChevronUp.svelte';

  let query: string = '';
  let replace: string | null = null;
  let caseSensitive: boolean = false;

  function onOpenChange(op: boolean) {
    open.set(op);
    if (!op) Notpad.editors.focus();
  }
</script>

<Dialog.Root open={$open} {onOpenChange} preventScroll={false}>
  <Dialog.Content overlayClass="hidden" class="top-14 translate-y-0">
    <Dialog.Title>Find And Replace</Dialog.Title>
    <Dialog.Description class="flex gap-3">
      <div class="flex w-full flex-col gap-1.5">
        <Input autocomplete="off" bind:value={query} id="query" placeholder="Find" />
        <Input autocomplete="off" bind:value={replace} id="replace" placeholder="Replace" />
      </div>

      <div class="grid grid-cols-2 gap-1.5">
        <Button size="icon" type="button">
          <ChevronDown />
        </Button>
        <Button size="icon" type="button">
          <ChevronUp />
        </Button>
        <span></span>
        <Toggle aria-label="Toggle case sensitive" variant="outline" bind:pressed={caseSensitive}>
          Aa
        </Toggle>
      </div>
    </Dialog.Description>
    <Dialog.Footer class="gap-y-2">
      <Button type="button" variant="secondary">Replace All</Button>
      <Button type="button" variant="secondary">Replace</Button>
      <Button
        type="button"
        variant="default"
        on:click={() => Notpad.searchOptions.find({ query, caseSensitive })}
      >
        Find
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
