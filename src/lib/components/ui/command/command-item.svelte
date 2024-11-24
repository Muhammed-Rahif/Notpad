<script lang="ts">
  import { Command as CommandPrimitive } from 'cmdk-sv';
  import { cn } from '@/utils';
  import type { Snippet } from 'svelte';

  type $$Props = CommandPrimitive.ItemProps;

  interface Props {
    asChild?: boolean;
    class?: string | undefined | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: Snippet<[any]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { asChild = false, class: className = undefined, children, ...rest }: Props = $props();

  const children_render = $derived(children);
</script>

<CommandPrimitive.Item
  {asChild}
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    className
  )}
  {...rest}
>
  {#snippet children({ action, attrs })}
    {@render children_render?.({ action, attrs })}
  {/snippet}
</CommandPrimitive.Item>
