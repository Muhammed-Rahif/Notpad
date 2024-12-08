<script module>
  import {writable} from 'svelte/store';
  const open = writable(false);
  export function openSaveAndQuitDialog() {
    open.set(true)
  }
</script>
<script lang="ts">
    import * as AlertDialog from "@/components/ui/alert-dialog";
    function handleSave() {
    console.log('File saved');
  }
  function handleDontSave() {
    console.log('File not saved');
  }
  function handleCancel() {
    console.log('Action canceled');
  }
</script>
  <AlertDialog.Root open={$open} onOpenChange={open.set}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Notpad</AlertDialog.Title>
        <AlertDialog.Description>
          Do you want to save changes to Untitled?
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Action onclick={handleSave}>Save</AlertDialog.Action>
        <AlertDialog.Action onclick={handleDontSave}>Don't Save</AlertDialog.Action>
        <AlertDialog.Cancel onclick={handleCancel}>Cancel</AlertDialog.Cancel>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>

