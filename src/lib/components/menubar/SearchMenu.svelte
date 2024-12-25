<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import { toggleGoToDialog } from '@/components/GoToDialog.svelte';
  import { toggleFindDialog } from '@/components/FindDialog.svelte';
  import GoogleLineIcon from '@/components/icons/GoogleLine.svelte';
</script>

<Menubar.Menu>
  <Menubar.Trigger>Search</Menubar.Trigger>
  <Menubar.Content>
    <Menubar.Item onclick={toggleFindDialog}>
      Find/Replace<Menubar.Shortcut>Ctrl+F</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Item onclick={toggleGoToDialog}>
      Go To<Menubar.Shortcut>Ctrl+G</Menubar.Shortcut>
    </Menubar.Item>
    <Menubar.Separator />
    <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb()}>
      Search on Google
      <GoogleLineIcon class="ml-auto text-muted-foreground" />
    </Menubar.Item>
  </Menubar.Content>
</Menubar.Menu>
