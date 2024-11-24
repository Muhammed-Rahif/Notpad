<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import Check from 'svelte-radix/Check.svelte';
  import { cn } from '@/utils.js';

  type $$Props = ContextMenuPrimitive.CheckboxItemProps;
  type $$Events = ContextMenuPrimitive.CheckboxItemEvents;

  interface Props {
    class?: $$Props['class'];
    checked?: $$Props['checked'];
    children?: import('svelte').Snippet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    checked = $bindable(undefined),
    children,
    ...rest
  }: Props = $props();
</script>

<ContextMenuPrimitive.CheckboxItem
  bind:checked
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
    className
  )}
  {...rest}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
>
  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <ContextMenuPrimitive.CheckboxIndicator>
      <Check class="h-4 w-4" />
    </ContextMenuPrimitive.CheckboxIndicator>
  </span>
  {@render children?.()}
</ContextMenuPrimitive.CheckboxItem>
