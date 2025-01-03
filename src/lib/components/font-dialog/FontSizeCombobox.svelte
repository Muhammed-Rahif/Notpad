<script lang="ts">
  import CheckIcon from '@/components/icons/Check.svelte';
  import ChevronsUpDownIcon from '@/components/icons/ChevronsUpDown.svelte';
  import { onMount, tick } from 'svelte';
  import * as Command from '@/components/ui/command';
  import * as Popover from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import { get } from 'svelte/store';
  import { Notpad } from '@/helpers/notpad';
  import type { SettingsType } from '@/types/SettingsType';
  import { Settings } from '@/helpers/settings';

  interface Props {
    value: SettingsType['font']['size'];
  }

  const settings = Notpad.stores.settings;
  let triggerRef = $state<HTMLButtonElement>(null!);
  let open = $state(false);
  let { value = $bindable() }: Props = $props();
  let selectedValue = $derived(
    Object.values(Settings.fontSizes).find((f) => f === value) ?? $settings.font.size
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }

  const onSelect = (currentValue: number | string) => {
    value = currentValue as SettingsType['font']['size'];
    closeAndFocusTrigger();
  };

  onMount(() => () => {
    value = get(settings).font.size;
  });
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <div>
        <Label for="font-size-command-button">Font Size</Label>
        <br />
        <Button
          variant="outline"
          class="w-full justify-between min-[464px]:w-[200px]"
          id="font-size-command-button"
          {...props}
          role="combobox"
          aria-expanded={open}
        >
          {selectedValue == 16 ? `${selectedValue} (Default)` : selectedValue}
          <ChevronsUpDownIcon class="ml-2 shrink-0 opacity-50" />
        </Button>
      </div>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search font size" />
      <Command.Empty>No font size found.</Command.Empty>
      <Command.Group class="max-h-56 overflow-y-auto">
        {#each Object.values(Settings.fontSizes) as fontSize}
          {@const fSize = fontSize.toString()}
          <Command.Item value={fSize} onSelect={() => onSelect(fontSize)}>
            <CheckIcon class={cn('mr-2', value !== fontSize && 'text-transparent')} />
            {fontSize == 16 ? `${fontSize} (Default)` : fontSize}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
