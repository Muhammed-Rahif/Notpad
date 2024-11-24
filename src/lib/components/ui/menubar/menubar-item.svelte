<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.ItemProps & {
    inset?: boolean;
  };
  type $$Events = MenubarPrimitive.ItemEvents;

  interface Props {
    class?: $$Props['class'];
    inset?: $$Props['inset'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
</script>

<MenubarPrimitive.Item
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
  on:pointerleave
  on:pointermove
  on:pointerdown
>
  {@render children?.()}
</MenubarPrimitive.Item>
