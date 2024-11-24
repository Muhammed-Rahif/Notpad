<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn, flyAndScale } from '@/utils';

  type $$Props = MenubarPrimitive.SubContentProps;
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
    transitionConfig = {
      x: -10,
      y: 0
    },
    children,
    ...rest
  }: Props = $props();
</script>

<MenubarPrimitive.SubContent
  {transition}
  {transitionConfig}
  class={cn(
    'z-50 min-w-max rounded-md border bg-popover p-1 text-popover-foreground shadow-lg focus:outline-none',
    className
  )}
  {...rest}
>
  {@render children?.()}
</MenubarPrimitive.SubContent>
