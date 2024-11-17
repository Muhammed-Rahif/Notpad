<script lang="ts">
  import CloseIcon from '@/components/icons/Close.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let filename = 'Untitled';

  function saveAction() {
    dispatch('save');
    isOpen = false;
  }

  function dontSaveAction() {
    dispatch('dontsave');
    isOpen = false;
  }

  function cancelAction() {
    dispatch('cancel');
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 mt-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="dark:bg-border w-full max-w-md rounded bg-white p-5 shadow-lg">
      <div class="flex justify-between">
        <h1 class="mb-4 mt-0 text-lg font-semibold">Notepad</h1>
        <CloseIcon on:click={cancelAction} class="cursor-pointer text-base hover:text-red-500" />
      </div>
      <h2 class="mb-4 text-blue-800">Do you want to save changes to {filename}?</h2>
      <div class="flex justify-end gap-3">
        <button
          on:click={saveAction}
          class="rounded border-2 border-blue-800 bg-gray-300 px-6 py-1 hover:bg-blue-200 dark:bg-zinc-700 dark:hover:bg-blue-900"
        >
          Save
        </button>
        <button
          on:click={dontSaveAction}
          class="rounded bg-gray-300 px-6 py-1 hover:bg-blue-200 dark:bg-zinc-700 dark:hover:bg-blue-900"
        >
          Don't Save
        </button>
        <button
          on:click={cancelAction}
          class="rounded bg-gray-300 px-6 py-1 hover:bg-blue-200 dark:bg-zinc-700 dark:hover:bg-blue-900"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
