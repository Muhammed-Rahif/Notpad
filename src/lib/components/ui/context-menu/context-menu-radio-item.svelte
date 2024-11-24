<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import DotFilled from 'svelte-radix/DotFilled.svelte';
  import { cn } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.RadioItemProps;
  type $$Events = ContextMenuPrimitive.RadioItemEvents;

  interface Props {
    class?: $$Props['class'];
    value: $$Props['value'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, value, children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.RadioItem
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
    className
  )}
  {value}
  {...rest}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <ContextMenuPrimitive.RadioIndicator>
      <DotFilled class="h-4 w-4 fill-current" />
    </ContextMenuPrimitive.RadioIndicator>
  </span>
  {@render children?.()}
</ContextMenuPrimitive.RadioItem>
