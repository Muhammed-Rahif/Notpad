<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import Cross2 from 'svelte-radix/Cross2.svelte';
  import * as Dialog from './';
  import { cn, flyAndScale } from '@/utils';

  type $$Props = DialogPrimitive.ContentProps & {
    overlayClass?: DialogPrimitive.OverlayProps['class'];
  };

  interface Props {
    class?: $$Props['class'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    overlayClass?: DialogPrimitive.OverlayProps['class'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    transition = flyAndScale,
    transitionConfig = {
      duration: 200
    },
    overlayClass = undefined,
    children,
    ...rest
  }: Props = $props();
</script>

<Dialog.Portal>
  <Dialog.Overlay class={overlayClass} />
  <DialogPrimitive.Content
    {transition}
    {transitionConfig}
    class={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full',
      className
    )}
    {...rest}
  >
    {@render children?.()}
    <DialogPrimitive.Close
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
    >
      <Cross2 class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
</Dialog.Portal>
