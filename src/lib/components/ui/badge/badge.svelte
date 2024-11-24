<script lang="ts">
  import { type Variant, badgeVariants } from './index.js';
  import { cn } from '@/utils.js';

  interface Props {
    class?: string | undefined | null;
    href?: string | undefined;
    variant?: Variant;
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    href = undefined,
    variant = 'default',
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={href ? 'a' : 'span'}
  {href}
  class={cn(badgeVariants({ variant, className }))}
  {...rest}
>
  {@render children?.()}
</svelte:element>
