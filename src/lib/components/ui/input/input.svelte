<script lang="ts">
  import { createBubbler, passive } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { InputEvents } from './index.js';
  import { cn } from '@/utils.js';

  type $$Props = HTMLInputAttributes;
  type $$Events = InputEvents;

  // Workaround for https://github.com/sveltejs/svelte/issues/9305

  interface Props {
    class?: $$Props['class'];
    value?: $$Props['value'];
    // Fixed in Svelte 5, but not backported to 4.x.
    readonly?: $$Props['readonly'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  let {
    class: className = undefined,
    value = $bindable(undefined),
    readonly = undefined,
    ...rest
  }: Props = $props();
</script>

<input
  class={cn(
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  bind:value
  {readonly}
  onblur={bubble('blur')}
  onchange={bubble('change')}
  onclick={bubble('click')}
  onfocus={bubble('focus')}
  onfocusin={bubble('focusin')}
  onfocusout={bubble('focusout')}
  onkeydown={bubble('keydown')}
  onkeypress={bubble('keypress')}
  onkeyup={bubble('keyup')}
  onmouseover={bubble('mouseover')}
  onmouseenter={bubble('mouseenter')}
  onmouseleave={bubble('mouseleave')}
  onmousemove={bubble('mousemove')}
  onpaste={bubble('paste')}
  oninput={bubble('input')}
  use:passive={['wheel', () => bubble('wheel')]}
  {...rest}
/>
