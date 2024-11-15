<script lang="ts">
  import CheckIcon from '@/components/icons/Check.svelte';
  import ChevronsUpDownIcon from '@/components/icons/ChevronsUpDown.svelte';
  import { onMount, tick } from 'svelte';
  import * as Command from '@/components/ui/command';
  import * as Popover from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import { FontSize, settings } from '@/store/store';
  import { get } from 'svelte/store';

  let open = false;

  export let value: FontSize;

  $: selectedValue = Object.values(FontSize).find((f) => f === value) ?? $settings.fontSize;

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  const onSelect = (
    currentValue: FontSize | string,
    ids: {
      content: string;
      trigger: string;
    }
  ) => {
    value = currentValue as FontSize;
    closeAndFocusTrigger(ids.trigger);
  };

  onMount(() => () => {
    value = get(settings).fontSize;
  });
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <div>
      <Label for="font-size-command-button">Font Size</Label>
      <br />
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between min-[464px]:w-[200px]"
        id="font-size-command-button"
      >
        {selectedValue == FontSize.Size16 ? `${selectedValue} (Default)` : selectedValue}
        <ChevronsUpDownIcon class="ml-2 shrink-0 text-base opacity-50" />
      </Button>
    </div>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search font size" />
      <Command.Empty>No font size found.</Command.Empty>
      <Command.Group class="max-h-56 overflow-y-auto">
        {#each Object.values(FontSize).filter((s) => !isNaN(Number(s))) as fontSize}
          {@const fSize = fontSize.toString()}
          <Command.Item value={fSize} onSelect={() => onSelect(fontSize, ids)}>
            <CheckIcon class={cn('mr-2 text-lg', value !== fontSize && 'text-transparent')} />
            {fontSize == FontSize.Size16 ? `${fontSize} (Default)` : fontSize}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
