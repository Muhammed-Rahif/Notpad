<script lang="ts">
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { autoWidth } from 'svelte-input-auto-width';
  import { tick } from 'svelte';
  import { longpress } from '@/actions/longpress';

  export let title: string;
  export let id: string;

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
    const isValidTitle = t !== '' && t.length > 0 && t.length <= 24;

    if (isValidTitle) {
      NotepadHelper.updateTitle(id, t);
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
    const t = input.value.trim();
    const isValidTitle = t !== '' && t.length > 0 && t.length <= 24;
    if (isValidTitle) return submit();
    if (!readonly && isValidTitle) input.focus();
  }
</script>

<form on:submit|preventDefault={submit}>
  <input
    bind:this={input}
    use:autoWidth
    on:dblclick|stopPropagation={allowEditing}
    on:keydown={onKeydown}
    on:longpress|stopPropagation={allowEditing}
    on:blur={onBlur}
    bind:value={title}
    use:longpress={1000}
    type="text"
    class="bordeone bg-transparent"
    maxlength={24}
    {readonly}
  />
</form>
