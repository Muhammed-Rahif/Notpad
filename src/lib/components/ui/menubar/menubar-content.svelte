<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils';

  type $$Props = MenubarPrimitive.ContentProps;
  interface Props {
    class?: $$Props['class'];
    align?: $$Props['align'];
    alignOffset?: $$Props['alignOffset'];
    sideOffset?: $$Props['sideOffset'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let {
    class: className = undefined,
    align = 'start',
    alignOffset = -4,
    sideOffset = 8,
    transition = flyAndScale,
    transitionConfig = undefined,
    children,
    ...rest
  }: Props = $props();
</script>

<MenubarPrimitive.Content
  {transition}
  {transitionConfig}
  {sideOffset}
  {align}
  {alignOffset}
  class={cn(
    'z-50 min-w-[12rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none',
    className
  )}
  {...rest}
>
  {@render children?.()}
</MenubarPrimitive.Content>
