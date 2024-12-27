<script lang="ts">
  import { Notpad } from '@/helpers/notpad';
  import { tick } from 'svelte';
  import { longpress } from '@/actions/longpress';
  import { activeTabId } from '@/store/store';
  import * as Tooltip from '@/components/ui/tooltip';
  import CloseIcon from '@/components/icons/Close.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import type { EditorType } from '@/src/lib/types/EditorType';
  import { cn } from '@/utils';
  import { resizeInputOnDynamicContent } from '@/actions/input-auto-width';

  interface Props {
    editor: EditorType;
  }

  const maxlength = 54;
  let { editor }: Props = $props();
  let readonly = $state(true);
  let input: HTMLInputElement = $state(null!);

  function allowEditing() {
    readonly = false;

    setTimeout(() => {
      input.focus();
    }, 0);
  }

  async function submit(e?: SubmitEvent) {
    e?.preventDefault();
    const t = input.value.trim();
    const isValidFileName = t !== '' && t.length > 0 && t.length <= maxlength;

    if (isValidFileName) {
      Notpad.editors.updateFileName(editor.id, t);
      readonly = true;

      await tick();
      input.blur();
    }
  }

  async function onKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Enter') {
      await submit();
    }
  }

  async function onBlur() {
    input.value = editor.fileName;
    readonly = true;
  }

  function onEditorClose(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (editor.isSaved) {
      Notpad.editors.remove(editor.id);
    } else {
      Notpad.dialogs.editorCloseConfirmation.set(editor.id);
    }
  }
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <div class="group flex items-center justify-center">
        <form class="relative text-center text-sm" onsubmit={submit}>
          <input
            bind:this={input}
            use:resizeInputOnDynamicContent
            ondblclick={allowEditing}
            onkeydown={onKeydown}
            use:longpress={1000}
            onlongpress={allowEditing}
            onblur={onBlur}
            value={editor.fileName}
            type="text"
            class={cn(
              'rounded bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary',
              editor.fileHandle && 'border-none border-transparent outline-none outline-transparent'
            )}
            {maxlength}
            {readonly}
          />
        </form>

        {#if !editor.isSaved}
          <span>^</span>
        {/if}

        <Button
          onclick={onEditorClose}
          size="sm"
          class={cn('h-6 w-6 p-0', {
            'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100':
              $activeTabId !== editor.id,
            'ml-1 mr-1': $activeTabId === editor.id
          })}
          variant={$activeTabId === editor.id ? 'secondary' : 'link'}
        >
          <CloseIcon />
        </Button>
      </div>
    </Tooltip.Trigger>

    {#if editor.filePath}
      <Tooltip.Content>
        {editor.filePath}
      </Tooltip.Content>
    {/if}
  </Tooltip.Root>
</Tooltip.Provider>
