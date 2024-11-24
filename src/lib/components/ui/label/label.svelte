<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = LabelPrimitive.Props;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<LabelPrimitive.Root
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className
  )}
  {...rest}
>
  {@render children?.()}
</LabelPrimitive.Root>
