<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.TriggerProps;
  type $$Events = MenubarPrimitive.TriggerEvents;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<MenubarPrimitive.Trigger
  class={cn(
    'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
    className
  )}
  {...rest}
  on:click
  on:keydown
  on:pointerenter
>
  {@render children?.()}
</MenubarPrimitive.Trigger>
