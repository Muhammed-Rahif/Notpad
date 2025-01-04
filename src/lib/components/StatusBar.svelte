<script lang="ts">
  import { createBubbler, preventDefault, stopPropagation } from 'svelte/legacy';
  import { slide } from 'svelte/transition';
  import { Notpad } from '@/helpers/notpad';

  interface Props {
    caretLineNo?: number;
    caretColumnNo?: number;
    characterCount?: number;
    wordCount?: number;
  }

  let { caretLineNo = 1, caretColumnNo = 1, characterCount = 0, wordCount = 0 }: Props = $props();

  const bubble = createBubbler();
  const settings = Notpad.stores.settings;
  const inAnimation = {
    duration: 80
  };
</script>

{#if $settings.statusBar}
  <div
    class="sticky bottom-0 z-10 h-[30px] w-screen rounded-lg border bg-primary/5"
    transition:slide
    oncontextmenu={stopPropagation(preventDefault(bubble('contextmenu')))}
    role="contentinfo"
  >
    <p
      class="flex h-full w-full items-center justify-start divide-x-2
      overflow-x-auto px-2 text-sm [&>span]:px-4 first:[&>span]:pl-0
      last:[&>span]:pr-0"
    >
      <span class="inline-flex items-center justify-center whitespace-nowrap">
        Line:
        {#key caretLineNo}
          <span in:slide={inAnimation} class="ml-1 inline-block">
            {caretLineNo}
          </span>
        {/key}
        , Column:
        {#key caretColumnNo}
          <span in:slide={inAnimation} class="ml-1 inline-block">
            {caretColumnNo}
          </span>
        {/key}
      </span>

      <span class="flex items-center justify-center">
        {#key characterCount}
          <span in:slide={inAnimation} class="mr-1 inline-block">
            {characterCount}
          </span>
        {/key}
        {characterCount <= 1 ? 'Character' : 'Characters'}
      </span>

      <span class="flex items-center justify-center">
        {#key wordCount}
          <span in:slide={inAnimation} class="mr-1 inline-block">
            {wordCount}
          </span>
        {/key}
        {wordCount <= 1 ? 'Word' : 'Words'}
      </span>

      <span class="ml-auto">
        {$settings.zoom * 100}%
      </span>
    </p>
  </div>
{/if}
