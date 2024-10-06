<script context="module">
  let open = false;

  export function openSaveDialog() {
    open = true;
  }
</script>

<script>
  import * as AlertDialog from '@/components/ui/alert-dialog';
  import { Notpad } from '@/helpers/notpad';
</script>

<AlertDialog.Root {open} onOpenChange={(op) => (open = op)}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>Would you like to save your changes?</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Cancel>No</AlertDialog.Cancel>
      <AlertDialog.Action autofocus on:click={() => Notpad.editors.createNew()}>
        Yes
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
