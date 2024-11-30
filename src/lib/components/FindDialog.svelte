<script context="module">
  import { get, writable } from 'svelte/store';

  const open = writable(false);

  export function toggleFindDialog() {
    open.set(!get(open));
  }
</script>

<script lang="ts">
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import { Notpad } from '@/helpers/notpad';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';
  import ChevronUp from '@/components/icons/ChevronUp.svelte';
  import { Checkbox } from '@/components/ui/checkbox';
  import Label from '@/components/ui/label/label.svelte';

  let query: string = '';
  let replace: string = '';
  let caseSensitive: boolean = false;
  let findIndex: number = 0;

  function setQuery(q: string) {
    query = q;
  }

  $: {
    if ($open) {
      const editor = Notpad.editors.getEditor();

      const selection = editor.selection;
      if (selection && editor.quill)
        setQuery(editor.quill.getText(selection.index, selection.length));
    }
    // Focus the editor when the dialog is closed
    else Notpad.editors.focus();
  }
</script>

<Dialog.Root open={$open} onOpenChange={open.set} preventScroll={false}>
  <Dialog.Content class="top-14 translate-y-0">
    <Dialog.Header>
      <Dialog.Title>Find And Replace</Dialog.Title>
    </Dialog.Header>

    <div class="flex flex-col gap-3">
      <div class="flex">
        <Input
          autocomplete="off"
          bind:value={query}
          id="query"
          placeholder="Find"
          class="rounded-r-none border-secondary !ring-0"
        />
        <Button
          on:click={() => {
            findIndex =
              Notpad.searchOptions.findMaybeReplace({
                query,
                caseSensitive,
                index: findIndex - 1
              }) ?? findIndex;
          }}
          variant="secondary"
          class="rounded-none"
          size="icon"
          type="button"
        >
          <ChevronUp class="text-xl" />
        </Button>
        <Button
          on:click={() => {
            findIndex =
              Notpad.searchOptions.findMaybeReplace({
                query,
                caseSensitive,
                index: findIndex + 1
              }) ?? findIndex;
          }}
          variant="secondary"
          class="rounded-l-none"
          size="icon"
          type="button"
        >
          <ChevronDown class="text-xl" />
        </Button>
      </div>
      <Input
        autocomplete="off"
        bind:value={replace}
        id="replace"
        placeholder="Replace"
        class="border-secondary !ring-0"
      />
      <div class="-mb-1.5 -mt-1 flex items-center justify-end gap-2">
        <Checkbox
          id="case-sensitive-checkbox"
          bind:checked={caseSensitive}
          aria-labelledby="case-sensitive"
          class="border-secondary"
        />
        <Label
          id="case-sensitive"
          for="case-sensitive-checkbox"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Case sensitive
        </Label>
      </div>
    </div>
    <Dialog.Footer class="gap-y-2">
      <Button
        type="button"
        variant="secondary"
        on:click={() =>
          Notpad.searchOptions.findAndReplaceAll({
            query,
            caseSensitive,
            replace
          })}
      >
        Replace All
      </Button>
      <Button
        type="button"
        variant="secondary"
        on:click={() =>
          Notpad.searchOptions.findMaybeReplace({
            query,
            caseSensitive,
            replace,
            index: findIndex
          })}
      >
        Replace
      </Button>
      <Button
        type="button"
        variant="default"
        on:click={() => {
          findIndex = 0;
          Notpad.searchOptions.findMaybeReplace({ query, caseSensitive });
        }}
      >
        Find
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
