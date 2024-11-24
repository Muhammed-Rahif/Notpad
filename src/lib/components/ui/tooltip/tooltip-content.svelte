<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils';

  type $$Props = TooltipPrimitive.ContentProps;

  interface Props {
    class?: $$Props['class'];
    sideOffset?: $$Props['sideOffset'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let {
    class: className = undefined,
    sideOffset = 4,
    transition = flyAndScale,
    transitionConfig = {
      y: 8,
      duration: 150
    },
    children,
    ...rest
  }: Props = $props();
</script>

<TooltipPrimitive.Content
  {transition}
  {transitionConfig}
  {sideOffset}
  class={cn(
    'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground',
    className
  )}
  {...rest}
>
  {@render children?.()}
</TooltipPrimitive.Content>
