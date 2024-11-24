<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.SeparatorProps;

  interface Props {
    class?: $$Props['class'];
    [key: string]: any;
  }

  let { class: className = undefined, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Separator class={cn('-mx-1 my-1 h-px bg-border', className)} {...rest} />
