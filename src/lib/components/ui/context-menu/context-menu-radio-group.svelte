<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';

  type $$Props = ContextMenuPrimitive.RadioGroupProps;

  interface Props {
    value?: $$Props['value'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let { value = $bindable(undefined), children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.RadioGroup {...rest} bind:value>
  {@render children?.()}
</ContextMenuPrimitive.RadioGroup>
