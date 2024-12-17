<script module>
  import { writable } from 'svelte/store';

  export type Status = 'save' | 'dont-save' | 'cancel';

  const open = writable(false);
  const resolve = writable<(value: Status) => void>(() => {});
  const fileName = writable('');

  export function openEditorCloseConfirmationDialog({
    fileName: fl
  }: {
    fileName: string;
  }): Promise<Status> {
    fileName.set(fl);
    open.set(true);

    return new Promise((res) => {
      resolve.set(res);
    });
  }
</script>

<script lang="ts">
  import * as AlertDialog from '@/components/ui/alert-dialog';
  import Button from '@/components/ui/button/button.svelte';

  function onSave() {
    $resolve('save');
    open.set(false);
  }

  function onDontSave(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    $resolve('dont-save');
    open.set(false);
  }

  function onCancel() {
    $resolve('cancel');
    open.set(false);
  }

  function onOpenChange(op: boolean) {
    open.set(op);
    if (op == false) {
      $resolve('cancel');
    }
  }
</script>

<AlertDialog.Root open={$open} {onOpenChange}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
      <AlertDialog.Description>
        The contents from "{$fileName}" are not saved to local file. Do you want to save it to a
        file before closing this editor? If you don't save, your changes will be lost.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={onCancel}>Cancel</AlertDialog.Cancel>
      <Button variant="outline" onclick={onDontSave}>Don't Save</Button>
      <AlertDialog.Action onclick={onSave}>Save</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
