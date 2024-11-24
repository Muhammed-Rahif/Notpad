<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/utils.js';

  type $$Props = HTMLAttributes<HTMLParagraphElement>;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<p class={cn('text-sm text-muted-foreground', className)} {...rest}>
  {@render children?.()}
</p>
