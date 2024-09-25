<script lang="ts">
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { autoWidth } from 'svelte-input-auto-width';
  import { tick } from 'svelte';

  export let title: string;
  export let id: string;

  let readonly = true;
  let input: HTMLInputElement;

  function onDbClick(e: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
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
    if (!readonly) input.focus();
  }
</script>

<form on:submit|preventDefault={submit}>
  <input
    bind:this={input}
    use:autoWidth
    on:dblclick|stopPropagation={onDbClick}
    on:blur={onBlur}
    bind:value={title}
    type="text"
    class="border-none bg-transparent font-semibold outline-none"
    maxlength={24}
    {readonly}
  />
  <span class="-ml-1 text-primary/50">.txt</span>
</form>
