<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { TextareaEvents } from './index.js';
  import { cn } from '@/utils.js';
  import { onMount } from 'svelte';
  import throttle from 'lodash.throttle';
  import Separator from '@/components/ui/separator/separator.svelte';

  export let textarea: HTMLTextAreaElement | null = null;

  let fakeCaret: HTMLDivElement | null = null;
  let caretPosition = { top: 10, left: 8, height: 24 };
  let lineNo = 1;
  let column = 1;
  // Import the textarea-caret module
  let getCaretCoordinates: any;
  let updateScheduled = false; // Flag to track if update is already scheduled

  onMount(async () => {
    const module = await import('textarea-caret');
    getCaretCoordinates = module.default;
    updateCaretPosition();
    textarea?.focus();
  });

  function updateLineAndColumn() {
    if (textarea) {
      const caretPosition = textarea.selectionStart;
      const textBeforeCaret = textarea.value.slice(0, caretPosition);

      // Calculate line number (count \n before caret)
      lineNo = textBeforeCaret.split('\n').length;

      // Calculate column (length of last line before caret)
      column = textBeforeCaret.length - textBeforeCaret.lastIndexOf('\n');
    }
  }

  // Use requestAnimationFrame for smooth updates
  const updateCaretPosition = throttle(() => {
    if (!updateScheduled) {
      updateScheduled = true;
      requestAnimationFrame(() => {
        if (textarea && getCaretCoordinates) {
          const caret = getCaretCoordinates(textarea, textarea.selectionEnd);

          // Adjust for the scroll position
          caretPosition = {
            top: caret.top - textarea.scrollTop,
            left: caret.left - textarea.scrollLeft,
            height: caret.height
          };

          // Update line and column numbers
          updateLineAndColumn();
        }
        updateScheduled = false;
      });
    }
  }, 50); // Adjust the delay as needed

  type $$Props = HTMLTextareaAttributes & {
    textarea: HTMLTextAreaElement | null;
  };
  type $$Events = TextareaEvents;

  let className: $$Props['class'] = undefined;
  export let value: $$Props['value'] = undefined;
  export { className as class };

  // Workaround for https://github.com/sveltejs/svelte/issues/9305
  // Fixed in Svelte 5, but not backported to 4.x.
  export let readonly: $$Props['readonly'] = undefined;
</script>

<div class="textarea-wrapper relative h-full">
  <textarea
    class={cn(
      'flex min-h-[60px] w-full rounded-md border border-input bg-transparent p-2 text-sm caret-transparent shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    bind:this={textarea}
    on:input={updateCaretPosition}
    on:scroll={updateCaretPosition}
    on:click={updateCaretPosition}
    on:keydown={updateCaretPosition}
    on:focus={updateCaretPosition}
    on:resize={updateCaretPosition}
    bind:value
    {readonly}
    on:blur
    on:change
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:paste
    {...$$restProps}
  />
  <!-- Fake caret -->
  <div
    class="fake-caret"
    bind:this={fakeCaret}
    style="top: calc({caretPosition.top}px - 2px); left: {caretPosition.left}px; height: {caretPosition.height}px;"
  />
</div>
<div class="absolute bottom-0 z-10 h-[24px] w-full bg-primary-foreground px-1">
  <Separator />
  <p class="flex h-full w-full items-center justify-start text-sm">
    Line: {lineNo}, Column: {column}
  </p>
</div>

<style>
  .fake-caret {
    @apply absolute z-0 w-0.5 rounded-[2px] bg-primary duration-75;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fake-caret {
    animation: blink 1s infinite;
  }
</style>
