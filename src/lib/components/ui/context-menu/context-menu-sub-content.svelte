<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.SubContentProps;

  interface Props {
    class?: $$Props['class'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    children?: import('svelte').Snippet;
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

<ContextMenuPrimitive.SubContent
  {transition}
  {transitionConfig}
  class={cn(
    'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg focus:outline-none',
    className
  )}
  {...rest}
  on:keydown
  on:focusout
  on:pointermove
>
  {@render children?.()}
</ContextMenuPrimitive.SubContent>
