<script lang="ts">
  import Editor from '@/components/editor/Editor.svelte';
  import * as Tabs from '@/components/ui/tabs';
  import * as ContextMenu from '@/components/ui/context-menu';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { slide } from 'svelte/transition';
  import EditMenuItems from '@/components/EditMenuItems.svelte';
  import { Notpad } from '@/helpers/notpad';

  const activeTabId = Notpad.stores.activeTabId;
  const editors = Notpad.stores.editors;

  let innerWidth = $state(window.innerWidth);
  let isMD = $derived(innerWidth <= 768);
  /**
   * Compact mode is disabled on mobile devices (width <= 450px)
   * and on PCs when multiple editors are open.
   */
  let tabsMode = $derived($editors.length > 1);
</script>

<svelte:window bind:innerWidth />

<Tabs.Root bind:value={$activeTabId} class="flex h-full w-full flex-col overflow-hidden">
  {#if tabsMode || isMD}
    <div transition:slide>
      <Tabs.List
        class="w-full justify-start gap-1 overflow-x-auto
        overflow-y-clip bg-muted/70 shadow"
      >
        {#each $editors as editor}
          <Tabs.Trigger value={editor.id} class="h-8 pl-2 pr-0">
            <div
              role="button"
              tabindex="0"
              class="flex items-center justify-center"
              onclick={() => ($activeTabId = editor.id)}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  $activeTabId = editor.id;
                }
              }}
            >
              <EditorTitle {editor} />
            </div>
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    </div>
  {/if}

  {#each $editors as editor (editor.id)}
    <Tabs.Content value={editor.id} class="mt-0 h-full overflow-hidden">
      <ContextMenu.Root>
        <ContextMenu.Trigger class="flex h-full flex-col">
          <Editor {editor} />
        </ContextMenu.Trigger>

        <ContextMenu.Content class="w-48">
          <EditMenuItems type="contextmenu" />
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Tabs.Content>
  {/each}
</Tabs.Root>
