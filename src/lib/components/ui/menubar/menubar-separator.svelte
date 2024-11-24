<script lang="ts">
  import { Menubar as MenubarPrimitive } from 'bits-ui';
  import { cn } from '@/utils';

  type $$Props = MenubarPrimitive.SeparatorProps;
  interface Props {
    class?: $$Props['class'];
    [key: string]: any;
  }

  let { class: className = undefined, ...rest }: Props = $props();
</script>

<MenubarPrimitive.Separator class={cn('-mx-1 my-1 h-px bg-muted', className)} {...rest} />
