<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import { isTauri } from '@/src/lib';
  import LogoutIcon from '@/components/icons/Logout.svelte';
</script>

<Menubar.Menu>
  <Menubar.Trigger>File</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item onclick={() => Notpad.editors.createNew()}>
      New<Menubar.Shortcut>{isTauri ? 'Ctrl+N' : 'Ctrl+Alt+N'}</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={Notpad.fileOptions.open}>
      Open...<Menubar.Shortcut>Ctrl+O</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={() => Notpad.fileOptions.save()}>
      Save<Menubar.Shortcut>Ctrl+S</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={() => Notpad.fileOptions.save({ saveAs: true })}>
      Save as...<Menubar.Shortcut>Ctrl+Shift+S</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={() => Notpad.fileOptions.print()}>
      Print<Menubar.Shortcut>Ctrl+P</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Separator />
    <Menubar.Item onclick={Notpad.close}>
      Exit
      <LogoutIcon class="ml-auto text-muted-foreground" />
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
