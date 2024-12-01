<script lang="ts">
  import Editor from '@/src/lib/components/Editor/Editor.svelte';
  import * as Tabs from '@/components/ui/tabs';
  import * as ContextMenu from '@/components/ui/context-menu';
  import EditorTitle from '@/components/EditorTitle.svelte';
  import { activeTabId, editors } from '@/store/store';
  import { Notpad } from '@/helpers/notpad';
  import { slide } from 'svelte/transition';
  import { cn } from '@/utils';

  let innerWidth = $state(window.innerWidth);

  let isXS = $derived(innerWidth <= 450);
  /**
   * Compact mode is disabled on mobile devices (width <= 450px)
   * and on PCs when multiple editors are open.
   */
  let tabsMode = $derived($editors.length > 1);
</script>

<svelte:window bind:innerWidth />

<Tabs.Root bind:value={$activeTabId} class="flex h-full w-full flex-col overflow-hidden">
  {#if tabsMode || isXS}
    <div transition:slide>
      <Tabs.List
        class="w-full justify-start gap-1 overflow-x-auto
        overflow-y-clip rounded-none shadow"
      >
        {#each $editors as editor}
          <Tabs.Trigger value={editor.id} class="h-8 pl-2 pr-0">
            <div
              role="button"
              tabindex="0"
              class={cn(
                'flex items-center justify-center',
                $activeTabId === editor.id ? 'bg-background' : 'bg-secondary'
              )}
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
    <Tabs.Content value={editor.id} class="mt-0 h-full w-full">
      <ContextMenu.Root>
        <ContextMenu.Trigger class="flex h-full w-full flex-col overflow-hidden">
          <Editor {editor} />
        </ContextMenu.Trigger>
        <ContextMenu.Content class="w-48">
          <ContextMenu.Item onclick={() => Notpad.editOptions.undo()}>
            Undo<ContextMenu.Shortcut>Ctrl+Z</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item onclick={() => Notpad.editOptions.redo()}>
            Redo<ContextMenu.Shortcut>Ctrl+Y</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onclick={() => Notpad.editOptions.cut()}>
            Cut<ContextMenu.Shortcut>Ctrl+X</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item onclick={() => Notpad.editOptions.copy()}>
            Copy<ContextMenu.Shortcut>Ctrl+C</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item onclick={() => Notpad.editOptions.paste()}>
            Paste<ContextMenu.Shortcut>Ctrl+V</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item onclick={() => Notpad.editOptions.selectAll()}>
            Select All
            <ContextMenu.Shortcut>Ctrl+A</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item onclick={() => Notpad.editOptions.insertDateAndTime()}>
            Time/Date
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Tabs.Content>
  {/each}
</Tabs.Root>
