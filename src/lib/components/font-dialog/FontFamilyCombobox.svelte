<script lang="ts">
  import { onMount, tick } from 'svelte';
  import * as Command from '@/components/ui/command';
  import * as Popover from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import { get } from 'svelte/store';
  import CheckIcon from '@/components/icons/Check.svelte';
  import ChevronsUpDownIcon from '@/components/icons/ChevronsUpDown.svelte';
  import { Notpad } from '@/helpers/notpad';
  import type { SettingsType } from '@/types/SettingsType';
  import { Settings } from '@/helpers/settings';

  interface Props {
    value: SettingsType['font']['family'];
  }

  const settings = Notpad.stores.settings;
  let triggerRef = $state<HTMLButtonElement>(null!);
  let open = $state(false);
  let { value = $bindable() }: Props = $props();
  let selectedValue = $derived(
    Object.values(Settings.fontFamilies).find((f) => f === value) ?? $settings.font.family
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

  const onSelect = (currentValue: SettingsType['font']['family']) => {
    value = currentValue;
    closeAndFocusTrigger();
  };

  onMount(() => () => {
    value = get(settings).font.family;
  });
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <div>
        <Label for="font-family-command-button">Font Family</Label>
        <br />
        <Button
          variant="outline"
          class="w-full justify-between min-[464px]:w-[200px]"
          id="font-family-command-button"
          {...props}
          role="combobox"
          aria-expanded={open}
        >
          {selectedValue == 'SUSE' ? `${selectedValue} (Default)` : selectedValue}
          <ChevronsUpDownIcon class="ml-2 shrink-0 opacity-50" />
        </Button>
      </div>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search font family" />
      <Command.Empty>No font family found.</Command.Empty>
      <Command.Group class="max-h-56 overflow-y-auto">
        {#each Object.values(Settings.fontFamilies) as fontFamily}
          <Command.Item
            value={fontFamily}
            onSelect={() => {
              onSelect(fontFamily as SettingsType['font']['family']);
            }}
          >
            <CheckIcon class={cn('mr-2', value !== fontFamily && 'text-transparent')} />
            {fontFamily == 'SUSE' ? `${fontFamily} (Default)` : fontFamily}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
