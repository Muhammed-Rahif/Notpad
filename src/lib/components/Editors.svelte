<script lang="ts">
  import Textarea from '@/components/ui/textarea/textarea.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import CloseIcon from '@/components/icons/close.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import { activeTabId, editors } from '@/store/store';
  import { EditorHelper } from '@/helpers/editor-helper';
  import type { ButtonEventHandler } from 'bits-ui';
  import type { FormTextareaEvent } from './ui/textarea';

  let textarea: HTMLTextAreaElement | null = null; // reference to the textarea

  // Focus on the textarea when the active tab changes
  $: txtArea = textarea;
  $: if (textarea && $activeTabId && txtArea) {
    setTimeout(() => {
      console.info('Focusing on textarea:', $activeTabId);
      txtArea.focus();
      txtArea.setSelectionRange(txtArea.value.length, txtArea.value.length);
    }, 120);
  }
  $: isSingleEditor = $editors.length == 1;

  function onEditorClose(e: ButtonEventHandler<MouseEvent>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    EditorHelper.remove(id);
  }

  function onTextareaChange(e: FormTextareaEvent<Event>) {
    EditorHelper.updateContent($activeTabId, (e.target as HTMLTextAreaElement).value);
  }
</script>

<Tabs.Root bind:value={$activeTabId} class="h-[calc(100%-98px)] w-full">
  <Tabs.List class="w-full justify-start overflow-x-scroll rounded-t-none">
    {#each $editors as { name, id }}
      <Tabs.Trigger value={id} class={isSingleEditor ? '' : 'pr-1'}>
        {name}

        {#if !isSingleEditor}
          <Button
            on:click={(e) => onEditorClose(e, id)}
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

  <!-- Only render one Textarea, which is active based on selected tab -->
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
