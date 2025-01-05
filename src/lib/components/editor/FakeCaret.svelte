<script lang="ts">
  import throttle from 'lodash.throttle';
  import debounce from 'lodash.debounce';
  import { position as getCaretPosition } from 'caret-pos';
  import type Quill from 'quill';
  import { cn } from '@/utils';
  import { Notpad } from '@/helpers/notpad';
  import { Settings } from '@/helpers/settings';

  interface Props {
    quill: Quill;
    editorContainer: HTMLElement;
  }

  let { quill, editorContainer }: Props = $props();
  let caret = $state({ top: 10, left: 8, height: 24 });
  let fakeCaretElement: HTMLSpanElement = $state(null!);

  const settings = Notpad.stores.settings;
  const caretStyle = $derived($settings.caret.style);

  const resumeFakeCaretBlink = debounce(function () {
    if (fakeCaretElement) fakeCaretElement.classList.add('animate-caret-blink');
  }, 1000);

  export const updateCaretPosition = throttle(() => {
    if (!quill) return;
    // console.count('Update caret position');

    requestAnimationFrame(async () => {
      if (fakeCaretElement) fakeCaretElement.classList.remove('animate-caret-blink');

      if (!quill) return;
      if (editorContainer) {
        try {
          const { top, left, height } = getCaretPosition(quill.root);

          // Adjust for the scroll position
          caret = {
            top: top - editorContainer.scrollTop,
            left: left - editorContainer.scrollLeft,
            height: height
          };
        } catch (error) {
          console.error(error);
        }
      }

      resumeFakeCaretBlink();
    });
  });
</script>

<span
  class={cn(
    'fake-caret absolute z-0 w-0.5 animate-caret-blink rounded-[.06em]',
    '[transition:left_var(--caret-animation-duration),top_var(--caret-animation-duration)]',
    {
      'bg-foreground': caretStyle != 'Hollow Block',
      'border border-foreground': caretStyle == 'Hollow Block'
    }
  )}
  style:width="calc({caretStyle == 'Vertical Bar' ? '2px' : '1ch'} * var(--editor-zoom))"
  style:height={caretStyle == 'Underline' ? '2px' : `${caret.height}px`}
  style:margin-top={caretStyle == 'Underline' ? `${caret.height + 2}px` : undefined}
  style:top="{caret.top}px"
  style:left="{caret.left}px"
  style:--caret-animation-duration={Settings.caret.animations[$settings.caret.animation]}
  bind:this={fakeCaretElement}
></span>

<style>
  .fake-caret {
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
  }
</style>
