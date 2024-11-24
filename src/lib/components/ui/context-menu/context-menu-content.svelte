<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.ContentProps;

  interface Props {
    class?: $$Props['class'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    transition = flyAndScale,
    transitionConfig = undefined,
    children,
    ...rest
  }: Props = $props();
</script>

<ContextMenuPrimitive.Content
  {transition}
  {transitionConfig}
  class={cn(
    'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none',
    className
  )}
  {...rest}
  on:keydown
>
  {@render children?.()}
</ContextMenuPrimitive.Content>
