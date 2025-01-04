<script lang="ts">
  import * as AlertDialog from '@/components/ui/alert-dialog';
  import Button from '@/components/ui/button/button.svelte';
  import { Notpad } from '@/helpers/notpad';
  import { get } from 'svelte/store';

  const openOrEditorId = Notpad.dialogs.editorCloseConfirmation;

  let fileName = $derived.by(() => {
    if (typeof openOrEditorId == 'string') return Notpad.editors.getEditor(openOrEditorId).fileName;
  });

  async function onSave() {
    if (typeof get(openOrEditorId) != 'string') return;

    await Notpad.fileOptions.save({ saveAs: true });
    openOrEditorId.set(false);
    await Notpad.editors.remove($openOrEditorId as string);
  }

  async function onDontSave(e: Event) {
    if (typeof get(openOrEditorId) != 'string') return;

    e.preventDefault();
    e.stopPropagation();
    await Notpad.editors.remove(get(openOrEditorId) as string);
    openOrEditorId.set(false);
  }

  function onCancel() {
    openOrEditorId.set(false);
  }

  function onOpenChange(op: boolean) {
    openOrEditorId.set(op && false);
  }
</script>

<AlertDialog.Root open={Boolean($openOrEditorId)} {onOpenChange}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
      <AlertDialog.Description>
        The contents from "{fileName}" are not saved to local file. Do you want to save it to a file
        before closing this editor? If you don't save, your changes will be lost.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={onCancel}>Cancel</AlertDialog.Cancel>
      <Button variant="outline" onclick={onDontSave}>Don't Save</Button>
      <AlertDialog.Action onclick={onSave}>Save</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
