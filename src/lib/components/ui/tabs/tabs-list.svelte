<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = TabsPrimitive.ListProps;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.List
  class={cn(
    'inline-flex h-9 items-center justify-center overflow-y-hidden rounded-lg bg-muted p-1 text-muted-foreground',
    className
  )}
  {...rest}
>
  {@render children?.()}
</TabsPrimitive.List>
