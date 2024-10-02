<script lang="ts">
  import { Notpad } from '@/helpers/notpad';
  import { autoWidth } from 'svelte-input-auto-width';
  import { tick } from 'svelte';
  import { longpress } from '@/actions/longpress';
  import type { EditorData } from '@/store';

  export let editor: EditorData;

  let readonly = true;
  let input: HTMLInputElement;

  function allowEditing() {
    readonly = false;

    setTimeout(() => {
      input.focus(); // Focus the input after it becomes editable
    }, 0);
  }

  async function submit() {
    const t = input.value.trim();
    const isValidFileName = t !== '' && t.length > 0 && t.length <= 24;

    if (isValidFileName) {
      Notpad.editors.updateFileName(editor.id, t);
      readonly = true;

      await tick(); // Ensure the DOM reflects the readonly change
      input.blur();
    }
  }

  async function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      await submit();
    }
  }

  async function onBlur() {
    input.value = editor.fileName;
    readonly = true;
  }
</script>

<form on:submit|preventDefault={submit}>
  <!-- A expected behaviour is that the title will not be available to edit on file that opened from local or saved locally.
  If you want to, you have save as it with new file-name/title. 
  
  Meaning only non-saved (saved on user local file system)
  files can be rename the title by double click. 
  -->
  <input
    bind:this={input}
    use:autoWidth
    on:dblclick|stopPropagation={allowEditing}
    on:keydown={onKeydown}
    on:longpress|stopPropagation={allowEditing}
    on:blur={onBlur}
    value={editor.fileName}
    use:longpress={1000}
    type="text"
    class="bordeone bg-transparent {!!editor.fileHandle
      ? 'border-none border-transparent outline-none outline-transparent'
      : ''}"
    maxlength={24}
    readonly={!!editor.fileHandle || readonly}
  />
</form>
