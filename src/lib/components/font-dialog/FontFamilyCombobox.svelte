<script lang="ts">
  import { onMount, tick } from 'svelte';
  import * as Command from '@/components/ui/command';
  import * as Popover from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import { FontFamily, settings } from '@/store/store';
  import { get } from 'svelte/store';
  import CheckIcon from '@/components/icons/Check.svelte';
  import ChevronsUpDownIcon from '@/components/icons/ChevronsUpDown.svelte';

  let open = false;

  export let value: FontFamily;

  $: selectedValue = Object.values(FontFamily).find((f) => f === value) ?? $settings.fontFamily;

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
    currentValue: FontFamily,
    ids: {
      content: string;
      trigger: string;
    }
  ) => {
    value = currentValue;
    closeAndFocusTrigger(ids.trigger);
  };

  onMount(() => () => {
    value = get(settings).fontFamily;
  });
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <div>
      <Label for="font-family-command-button">Font Family</Label>
      <br />
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between min-[464px]:w-[200px]"
        id="font-family-command-button"
      >
        {selectedValue == FontFamily.SUSE ? `${selectedValue} (Default)` : selectedValue}
        <ChevronsUpDownIcon class="ml-2 shrink-0 text-base opacity-50" />
      </Button>
    </div>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search font family" />
      <Command.Empty>No font family found.</Command.Empty>
      <Command.Group class="max-h-56 overflow-y-auto">
        {#each Object.values(FontFamily) as fontFamily}
          <Command.Item value={fontFamily} onSelect={() => onSelect(fontFamily, ids)}>
            <CheckIcon class={cn('mr-2 text-lg', value !== fontFamily && 'text-transparent')} />
            {fontFamily == FontFamily.SUSE ? `${fontFamily} (Default)` : fontFamily}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
