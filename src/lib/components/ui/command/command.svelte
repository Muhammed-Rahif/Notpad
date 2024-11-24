<script lang="ts">
  import { Command as CommandPrimitive } from 'cmdk-sv';
  import { cn } from '@/utils';

  type $$Props = CommandPrimitive.CommandProps;

  interface Props {
    value?: $$Props['value'];
    class?: string | undefined | null;
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    value = $bindable(undefined),
    class: className = undefined,
    children,
    ...rest
  }: Props = $props();
</script>

<CommandPrimitive.Root
  class={cn(
    'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
    className
  )}
  bind:value
  {...rest}
>
  {@render children?.()}
</CommandPrimitive.Root>
