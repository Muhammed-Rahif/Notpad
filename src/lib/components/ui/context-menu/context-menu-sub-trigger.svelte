<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive, type WithoutChild } from 'bits-ui';
  import ChevronRightIcon from '@/components/icons/ChevronRight.svelte';
  import { cn } from '@/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    inset,
    ...restProps
  }: WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
    inset?: boolean;
  } = $props();
</script>

<ContextMenuPrimitive.SubTrigger
  bind:ref
  class={cn(
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground',
    inset && 'pl-8',
    className
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto size-4" />
</ContextMenuPrimitive.SubTrigger>
