<script lang="ts">
  import { Menubar as MenubarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
  import CheckIcon from '@/components/icons/Check.svelte';
  import MinusIcon from '@/components/icons/Minus.svelte';
  import { cn } from '@/utils.js';
  import type { Snippet } from 'svelte';

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();
</script>

<MenubarPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
    className
  )}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      {#if indeterminate}
        <MinusIcon class="size-4" />
      {:else}
        <CheckIcon class={cn('size-4', !checked && 'text-transparent')} />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</MenubarPrimitive.CheckboxItem>
