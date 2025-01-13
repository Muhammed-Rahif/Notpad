<script lang="ts">
  import GoogleLineIcon from '@/components/icons/GoogleLine.svelte';
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
</script>

<Menubar.Menu>
  <Menubar.Trigger>Search</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item onclick={() => Notpad.dialogs.find.set(true)}>
      Find/Replace<Menubar.Shortcut>Ctrl+F</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={() => Notpad.dialogs.goTo.set(true)}>
      Go To<Menubar.Shortcut>Ctrl+G</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Separator />
    <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb()}>
      Search on Google
      <GoogleLineIcon class="ml-auto text-muted-foreground" />
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
