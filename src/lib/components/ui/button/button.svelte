<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui';
  import { type Events, type Props, buttonVariants } from './';
  import { cn } from '@/utils';

  type $$Props = Props;
  type $$Events = Events;

  interface Props_1 {
    class?: $$Props['class'];
    variant?: $$Props['variant'];
    size?: $$Props['size'];
    builders?: $$Props['builders'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    variant = 'default',
    size = 'default',
    builders = [],
    children,
    ...rest
  }: Props_1 = $props();
</script>

<ButtonPrimitive.Root
  {builders}
  class={cn(buttonVariants({ variant, size, className }))}
  type="button"
  {...rest}
  on:click
  on:keydown
>
  {@render children?.()}
</ButtonPrimitive.Root>
