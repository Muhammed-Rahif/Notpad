<script lang="ts">
  import throttle from 'lodash.throttle';
  import debounce from 'lodash.debounce';
  import { position as getCaretPosition } from 'caret-pos';
  import { settings } from '@/store/store';
  import type Quill from 'quill';

  interface Props {
    quill: Quill;
    editorContainer: HTMLElement;
  }

  let { quill, editorContainer }: Props = $props();
  let caret = $state({ top: 10, left: 8, height: 24 });
  let fakeCaretElement: HTMLSpanElement = $state(null!);

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
  class="fake-caret absolute z-0 w-0.5 animate-caret-blink
    rounded-[.06em] bg-primary"
  bind:this={fakeCaretElement}
  style="top: {caret.top}px;
    left: {caret.left}px;
    height: {caret.height}px;
    width: {$settings.zoom * 2}px"
  spellcheck="false"
></span>
