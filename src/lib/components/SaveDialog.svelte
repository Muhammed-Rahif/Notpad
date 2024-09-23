<script>
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { EditorHelper } from '@/helpers/editor-helper';
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
      <AlertDialog.Action autofocus on:click={() => EditorHelper.createNew()}>
        Yes
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
