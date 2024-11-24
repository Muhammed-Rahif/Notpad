<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils';

  type $$Props = PopoverPrimitive.ContentProps;

  interface Props {
    class?: $$Props['class'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    align?: $$Props['align'];
    sideOffset?: $$Props['sideOffset'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    transition = flyAndScale,
    transitionConfig = undefined,
    align = 'center',
    sideOffset = 4,
    children,
    ...rest
  }: Props = $props();
</script>

<PopoverPrimitive.Content
  {transition}
  {transitionConfig}
  {align}
  {sideOffset}
  {...rest}
  class={cn(
    'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
    className
  )}
>
  {@render children?.()}
</PopoverPrimitive.Content>
