<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils.js';
  import ChevronRightIcon from '@/components/icons/ChevronRight.svelte';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    children,
    ...restProps
  }: MenubarPrimitive.SubTriggerProps & {
    inset?: boolean;
  } = $props();
</script>

<MenubarPrimitive.SubTrigger
  bind:ref
  class={cn(
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground data-[disabled]:opacity-50',
    inset && 'pl-8',
    className
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronRightIcon class="ml-auto size-4" />
</MenubarPrimitive.SubTrigger>
