<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
  };
  type $$Events = ContextMenuPrimitive.ItemEvents;

  interface Props {
    class?: $$Props['class'];
    inset?: $$Props['inset'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Item
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
    inset && 'pl-8',
    className
  )}
  {...rest}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
>
  {@render children?.()}
</ContextMenuPrimitive.Item>
