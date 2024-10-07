<script lang="ts">
  import Editor from '@/components/Editor.svelte';
  import * as Tabs from '@/components/ui/tabs';
  import CloseIcon from '@/components/icons/close.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import { activeTabId, editors } from '@/store/store';
  import { Notpad } from '@/helpers/notpad';
  import type { ButtonEventHandler } from 'bits-ui';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { slide } from 'svelte/transition';

  let innerWidth = window.innerWidth;

  function onEditorClose(e: ButtonEventHandler<MouseEvent>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    Notpad.editors.remove(id);
  }

  $: isXS = innerWidth <= 450;
  /**
   * Compact mode is disabled on mobile devices (width <= 450px)
   * and on PCs when multiple editors are open.
   */
  $: tabsMode = $editors.length > 1;
</script>

<svelte:window bind:innerWidth />

<Tabs.Root bind:value={$activeTabId} class="flex h-full w-full flex-col overflow-hidden">
  {#if tabsMode || isXS}
    <div transition:slide>
      <Tabs.List
        class="w-full justify-start overflow-x-scroll
        rounded-t-none py-0.5 shadow"
      >
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

  {#each $editors as editor}
    <Tabs.Content value={editor.id} class="mt-0 h-full">
      <Editor {editor} />
    </Tabs.Content>
  {/each}
</Tabs.Root>
