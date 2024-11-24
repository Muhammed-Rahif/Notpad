<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.Props;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
  }

  let { class: className = undefined, children }: Props = $props();
</script>

<MenubarPrimitive.Root
  class={cn(
    'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
    className
  )}
>
  {@render children?.()}
</MenubarPrimitive.Root>
