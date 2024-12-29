<script lang="ts">
  import CheckIcon from '@/components/icons/Check.svelte';
  import ChevronsUpDownIcon from '@/components/icons/ChevronsUpDown.svelte';
  import { onMount, tick } from 'svelte';
  import * as Command from '@/components/ui/command';
  import * as Popover from '@/components/ui/popover';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import { settings } from '@/store/store';
  import { get } from 'svelte/store';
  import { FontSize } from '@/src/lib/types/SettingsType';

  interface Props {
    value: keyof typeof FontSize;
  }

  let triggerRef = $state<HTMLButtonElement>(null!);
  let open = $state(false);
  let { value: key = $bindable() }: Props = $props();
  let selectedValue = $derived(
    Object.values(FontSize).find((f) => f === FontSize[key]) ?? $settings.fontSize
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
    key = currentValue as keyof typeof FontSize;
    closeAndFocusTrigger();
  };

  onMount(() => () => {
    key = get(settings).fontSize;
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
          {selectedValue == '16' ? `${selectedValue} (Default)` : selectedValue}
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
        {#each Object.values(FontSize).filter((s) => !isNaN(Number(s))) as fontSize}
          {@const fSize = fontSize.toString()}
          <Command.Item value={fSize} onSelect={() => onSelect(fontSize)}>
            <CheckIcon class={cn('mr-2', FontSize[key] !== fontSize && 'text-transparent')} />
            {fontSize == 16 ? `${fontSize} (Default)` : fontSize}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
