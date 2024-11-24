<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { fade } from 'svelte/transition';
  import { cn } from '@/utils';

  type $$Props = DialogPrimitive.OverlayProps;

  interface Props {
    class?: $$Props['class'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    transition = fade,
    transitionConfig = {
      duration: 150
    },
    ...rest
  }: Props = $props();
</script>

<DialogPrimitive.Overlay
  {transition}
  {transitionConfig}
  class={cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ', className)}
  {...rest}
/>
