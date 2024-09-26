<script>
  import * as AlertDialog from '@/components/ui/alert-dialog';
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { saveDialog } from '@/store/store';
</script>

<AlertDialog.Root open={$saveDialog} onOpenChange={saveDialog.set}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>Would you like to save your changes?</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Cancel>No</AlertDialog.Cancel>
      <AlertDialog.Action autofocus on:click={() => NotepadHelper.createNew()}>
        Yes
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
