<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui';
  import Check from 'svelte-radix/Check.svelte';
  import Minus from 'svelte-radix/Minus.svelte';
  import { cn } from '@/utils.js';

  type $$Props = CheckboxPrimitive.Props;
  type $$Events = CheckboxPrimitive.Events;

  interface Props {
    class?: $$Props['class'];
    checked?: $$Props['checked'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, checked = $bindable(false), ...rest }: Props = $props();
</script>

<CheckboxPrimitive.Root
  class={cn(
    'peer box-content h-4 w-4 shrink-0 rounded-sm border border-primary shadow data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  bind:checked
  on:click
  {...rest}
>
  <CheckboxPrimitive.Indicator class={cn('flex h-4 w-4 items-center justify-center text-current')}>
    {#snippet children({ isChecked, isIndeterminate })}
      {#if isIndeterminate}
        <Minus class="h-3.5 w-3.5" />
      {:else}
        <Check class={cn('h-3.5 w-3.5', !isChecked && 'text-transparent')} />
      {/if}
    {/snippet}
  </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
