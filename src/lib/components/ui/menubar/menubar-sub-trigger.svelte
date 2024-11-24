<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import ChevronRight from 'svelte-radix/ChevronRight.svelte';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.SubTriggerProps & {
    inset?: boolean;
  };
  type $$Events = MenubarPrimitive.SubTriggerEvents;

  interface Props {
    class?: $$Props['class'];
    inset?: $$Props['inset'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
</script>

<MenubarPrimitive.SubTrigger
  class={cn(
    'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground data-[disabled]:opacity-50',
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
</MenubarPrimitive.SubTrigger>
