<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/utils.js';

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    'data-state'?: unknown;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<tr
  class={cn(
    'border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50',
    className
  )}
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</tr>
