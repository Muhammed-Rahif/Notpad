<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { cn } from '@/utils.js';
  import Cross2 from 'svelte-radix/Cross2.svelte';

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<div
  class={cn('sticky top-0 z-10 bg-background pt-6 text-center sm:text-left', className)}
  {...$$restProps}
>
  <div class="relative flex flex-col gap-1">
    <slot />
    <DialogPrimitive.Close
      class="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <Cross2 class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </DialogPrimitive.Close>
  </div>

  <hr class="mt-3" />
</div>
