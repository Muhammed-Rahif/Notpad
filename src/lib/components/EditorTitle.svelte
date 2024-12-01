<script lang="ts">
  import { Notpad } from '@/helpers/notpad';
  import { autoWidth } from 'svelte-input-auto-width';
  import { tick } from 'svelte';
  import { longpress } from '@/actions/longpress';
  import { activeTabId } from '@/store/store';
  import * as Tooltip from '@/components/ui/tooltip';
  import type { ButtonEventHandler } from 'bits-ui';
  import CloseIcon from '@/components/icons/Close.svelte';
  import Button from '@/components/ui/button/button.svelte';
  import type { EditorType } from '@/src/lib/types/EditorTypes';

  export let editor: EditorType;

  let readonly = true;
  let input: HTMLInputElement;

  function allowEditing() {
    readonly = false;

    setTimeout(() => {
      input.focus();
    }, 0);
  }

  async function submit() {
    const t = input.value.trim();
    const isValidFileName = t !== '' && t.length > 0 && t.length <= 24;

    if (isValidFileName) {
      Notpad.editors.updateFileName(editor.id, t);
      readonly = true;

      await tick();
      input.blur();
    }
  }

  async function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      await submit();
    }
  }

  async function onBlur() {
    input.value = editor.fileName;
    readonly = true;
  }

  function onEditorClose(e: ButtonEventHandler<MouseEvent>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    Notpad.editors.remove(id);
  }
</script>

<Tooltip.Root openDelay={0} closeDelay={0}>
  <Tooltip.Trigger>
    <div class="flex items-center justify-center">
      <form class="relative text-center text-sm" on:submit|preventDefault={submit}>
        <!-- A expected behaviour is that the title will not be available to edit on file that opened from local or saved locally.
        If you want to, you have save as it with new file-name/title. 
        
        Meaning only non-saved (saved on user local file system)
        files can be rename the title by double click. 
        -->
        <input
          bind:this={input}
          use:autoWidth
          on:dblclick={allowEditing}
          on:keydown={onKeydown}
          on:longpress={allowEditing}
          on:blur={onBlur}
          value={editor.fileName}
          use:longpress={1000}
          type="text"
          class="rounded bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary {editor.fileHandle
            ? 'border-none border-transparent outline-none outline-transparent'
            : ''}"
          maxlength={54}
          readonly={!!editor.fileHandle || readonly}
        />
      </form>
      <Button
        on:click={(e) => onEditorClose(e, editor.id)}
        size="sm"
        class="h-6 w-6 p-0"
        variant={$activeTabId === editor.id ? 'secondary' : 'outline'}
      >
        <CloseIcon class="text-base" />
      </Button>
    </div>
  </Tooltip.Trigger>
  {#if editor.filePath}
    <Tooltip.Content>
      {editor.filePath}
    </Tooltip.Content>
  {/if}
</Tooltip.Root>
