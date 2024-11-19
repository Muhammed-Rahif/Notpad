<script context="module">
  import { writable } from 'svelte/store';

  // Store to control the dialog's open state
  const open = writable(false);

  // Function to open the dialog
  export function openShortCutDialog() {
    open.set(true);
  }
</script>

<script lang="ts">
  import * as Table from '@/components/ui/table';
  import * as Dialog from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';

  const shortcuts = {
		"New": "Ctrl + Alt + N",
  	"Open": "Ctrl + O",
		"Save": "Ctrl + S",
		"Print": "Ctrl + P",
		"Undo": "Ctrl + Z",
    "Redo": "Ctrl + Y",
    "Cut": "Ctrl + X",
    "Copy": "Ctrl + C",
    "Paste": "Ctrl + V",
    "Select All": "Ctrl + A",
    "Find/Replace": "Ctrl + F",
    "Go To": "Ctrl + G",
    "Full Screen": "F11",
	}
 

  // Function to close the dialog

  function closeShortCutDialog() {
    open.set(false);
  }
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Trigger />

  <Dialog.Content class="max-h-[96vh]  overflow-y-auto">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="text-center">Function</Table.Head>
          <Table.Head class="text-center">Shortcuts</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each Object.entries(shortcuts) as [action, shortcut]}
          <Table.Row>
            <Table.Cell class="text-center">{action}</Table.Cell>
            <Table.Cell class="text-center">{shortcut}</Table.Cell>
          </Table.Row>
          {/each}
      </Table.Body>
    </Table.Root>
    <Button on:click={closeShortCutDialog}>Cencel</Button>
  </Dialog.Content>
</Dialog.Root>
