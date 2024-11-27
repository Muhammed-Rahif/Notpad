<script lang="ts">
  import Separator from '@/components/ui/separator/separator.svelte';
  import { settings } from '@/store/store';
  import { slide } from 'svelte/transition';

  export let caretLineNo = 1;
  export let caretColumnNo = 1;
  export let characterCount = 0;
  export let wordCount = 0;

  const inAnimation = {
    duration: 80
  };
</script>

{#if $settings.statusBar}
  <div
    class="sticky bottom-0 z-10 h-[30px] w-full
    bg-primary-foreground px-2"
    transition:slide
    on:contextmenu|stopPropagation|preventDefault
    role="contentinfo"
  >
    <Separator />
    <p
      class="flex h-full w-full items-center justify-start
  divide-x-2 text-sm [&>span]:px-4 first:[&>span]:pl-0 last:[&>span]:pr-0"
    >
      <span class="flex items-center justify-center">
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
