<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import ChevronRight from 'svelte-radix/ChevronRight.svelte';
  import { cn } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  };
  type $$Events = ContextMenuPrimitive.SubTriggerEvents;

  interface Props {
    class?: $$Props['class'];
    inset?: $$Props['inset'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.SubTrigger
  class={cn(
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground',
    inset && 'pl-8',
    className
  )}
  {...rest}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerleave
  on:pointermove
>
  {@render children?.()}
  <ChevronRight class="ml-auto h-4 w-4" />
</ContextMenuPrimitive.SubTrigger>
