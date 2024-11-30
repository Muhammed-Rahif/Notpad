<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import * as Dialog from './index.js';
  import { cn, flyAndScale } from '@/utils.js';

  type $$Props = DialogPrimitive.ContentProps;

  let className: $$Props['class'] = undefined;
  export let transition: $$Props['transition'] = flyAndScale;
  export let transitionConfig: $$Props['transitionConfig'] = {
    duration: 200
  };
  export { className as class };
</script>

<Dialog.Portal>
  <Dialog.Overlay />
  <DialogPrimitive.Content
    {transition}
    {transitionConfig}
    class={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 pt-0 shadow-lg sm:rounded-lg md:w-full',
      className
    )}
    {...$$restProps}
  >
    <slot />
  </DialogPrimitive.Content>
</Dialog.Portal>
