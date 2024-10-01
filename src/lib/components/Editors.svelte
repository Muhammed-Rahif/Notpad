<script lang="ts">
  import Textarea from '@/components/ui/textarea/textarea.svelte';
  import * as Tabs from '@/components/ui/tabs';
  import CloseIcon from '@/components/icons/close.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import { activeTabId, editors } from '@/store/store';
  import { Notpad } from '@/helpers/notpad';
  import type { ButtonEventHandler } from 'bits-ui';
  import type { FormTextareaEvent } from './ui/textarea';
  import EditorTitle from './EditorTitle.svelte';
  import { slide } from 'svelte/transition';

  let textarea: HTMLTextAreaElement | null = null; // reference to the textarea
  let innerWidth = window.innerWidth;

  function onEditorClose(e: ButtonEventHandler<MouseEvent>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    Notpad.editors.remove(id);
  }

  function onTextareaChange(e: FormTextareaEvent<Event>) {
    Notpad.editors.updateContent($activeTabId, (e.target as HTMLTextAreaElement).value);
  }

  // Focus on the textarea when the active tab changes
  $: txtArea = textarea;
  $: if (textarea && $activeTabId && txtArea) {
    setTimeout(() => {
      // console.info('Focusing on textarea:', $activeTabId);
      txtArea.focus();
      txtArea.setSelectionRange(txtArea.value.length, txtArea.value.length);
    }, 120);
  }
  $: isXS = innerWidth <= 450;
  $: tabsMode = $editors.length > 1; // compact mode will not available on mobile width (w<=450), also on pc when multiple editors.
  $: tabsClass = tabsMode ? 'h-[calc(100%-96px)] w-full' : 'h-[calc(100%-60px)] w-full';
</script>

<svelte:window bind:innerWidth />

<Tabs.Root bind:value={$activeTabId} class={tabsClass}>
  {#if tabsMode || isXS}
    <div transition:slide>
      <Tabs.List class="w-full justify-start overflow-x-scroll rounded-t-none py-0.5 shadow">
        {#each $editors as editor}
          <Tabs.Trigger value={editor.id} class={tabsMode ? 'pr-1' : ''}>
            <EditorTitle {editor} />

            {#if tabsMode}
              <Button
                on:click={(e) => onEditorClose(e, editor.id)}
                size="sm"
                class="ml-1 h-6 w-6 p-0"
                variant="secondary"
              >
                <CloseIcon />
              </Button>
            {/if}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    </div>
  {/if}

  <!-- Only render one Textarea, which is focused based on selected tab -->
  <Tabs.Content value={$activeTabId} class="mt-0 h-full">
    <Textarea
      bind:textarea
      class="relative h-full w-full resize-none rounded-none !border-none bg-transparent text-base !outline-none !ring-0"
      spellcheck={false}
      value={$editors.find((editor) => editor.id === $activeTabId)?.content}
      on:keyup={onTextareaChange}
    />
  </Tabs.Content>
</Tabs.Root>
