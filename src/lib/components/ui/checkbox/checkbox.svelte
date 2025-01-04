<script lang="ts">
  import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
  import { cn } from '@/utils.js';
  import CheckIcon from '@/components/icons/Check.svelte';
  import MinusIcon from '@/components/icons/Minus.svelte';

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    indeterminate = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  class={cn(
    'peer box-content size-4 shrink-0 rounded-sm border border-primary shadow data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  bind:checked
  bind:ref
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="flex items-center justify-center text-current">
      {#if indeterminate}
        <MinusIcon class="size-4" />
      {:else}
        <CheckIcon class={cn('size-4', !checked && 'text-transparent')} />
      {/if}
    </span>
  {/snippet}
</CheckboxPrimitive.Root>
