<script lang="ts">
  import * as Table from '@/components/ui/table';
  import * as Dialog from '@/components/ui/dialog';
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';

  const open = Notpad.dialogs.shortcuts;
  const shortcuts = {
    New: 'Ctrl + Alt + N',
    Open: 'Ctrl + O',
    Save: 'Ctrl + S',
    Print: 'Ctrl + P',
    Undo: 'Ctrl + Z',
    Redo: 'Ctrl + Y',
    Cut: 'Ctrl + X',
    Copy: 'Ctrl + C',
    Paste: 'Ctrl + V',
    'Select All': 'Ctrl + A',
    'Find/Replace': 'Ctrl + F',
    'Go To': 'Ctrl + G',
    'Full Screen': 'F11'
  };
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Shortcuts</Dialog.Title>
      <Dialog.Description>
        Here is a list of keyboard shortcuts that you can use to quickly perform actions in this
        application.
      </Dialog.Description>
    </Dialog.Header>

    <div class="w-full">
      <div class="sticky top-0 bg-muted">
        <Table.Root class="table w-full">
          <Table.Header>
            <Table.Row>
              <Table.Head class="text-center">Function</Table.Head>
              <Table.Head class="text-center">Shortcuts</Table.Head>
            </Table.Row>
          </Table.Header>
        </Table.Root>
      </div>

      <div class="max-h-[60vh] overflow-y-auto">
        <Table.Root class="table w-full">
          <Table.Body>
            {#each Object.entries(shortcuts) as [action, shortcut]}
              <Table.Row>
                <Table.Cell class="text-center">{action}</Table.Cell>
                <Table.Cell class="text-center">
                  <Menubar.Shortcut>
                    {shortcut}
                  </Menubar.Shortcut>
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
