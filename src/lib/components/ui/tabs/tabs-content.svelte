<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = TabsPrimitive.ContentProps;

  interface Props {
    class?: $$Props['class'];
    value: $$Props['value'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, value, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Content
  class={cn(
    'mt-2 flex flex-col overflow-hidden ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  )}
  {value}
  {...rest}
>
  {@render children?.()}
</TabsPrimitive.Content>
