<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/utils.js';

  type $$Props = HTMLAttributes<HTMLDivElement>;

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
  {...rest}
  onclick={bubble('click')}
  onfocusin={bubble('focusin')}
  onfocusout={bubble('focusout')}
  onmouseenter={bubble('mouseenter')}
  onmouseleave={bubble('mouseleave')}
>
  {@render children?.()}
</div>
