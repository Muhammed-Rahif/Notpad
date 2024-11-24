<script lang="ts">
  import { Command as CommandPrimitive } from 'cmdk-sv';
  import { cn } from '@/utils';
  type $$Props = CommandPrimitive.GroupProps;

  interface Props {
    class?: string | undefined | null;
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<CommandPrimitive.Group
  class={cn(
    'overflow-hidden p-1 text-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group-heading]]:text-muted-foreground',
    className
  )}
  {...rest}
>
  {@render children?.()}
</CommandPrimitive.Group>
