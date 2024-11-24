<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.LabelProps & {
    inset?: boolean;
  };
  interface Props {
    class?: $$Props['class'];
    inset?: $$Props['inset'];
    children?: import('svelte').Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, inset = undefined, children, ...rest }: Props = $props();
</script>

<MenubarPrimitive.Label
  class={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
  {...rest}
>
  {@render children?.()}
</MenubarPrimitive.Label>
