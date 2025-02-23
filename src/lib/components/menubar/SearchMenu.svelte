<script lang="ts">
  import GoogleIcon from '@/components/icons/Google.svelte';
  import MicrosoftBing from '@/components/icons/MicrosoftBing.svelte';
  import DuckDuckGo from '@/components/icons/DuckDuckGo.svelte';
  import Yahoo from '@/components/icons/Yahoo.svelte';
  import Brave from '@/components/icons/Brave.svelte';
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
    <Menubar.Sub>
      <Menubar.SubTrigger>Search on</Menubar.SubTrigger>
      <Menubar.SubContent>
        <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb('google')}>
          Google
          <GoogleIcon class="ml-auto text-muted-foreground" />
        </Menubar.Item>
        <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb('bing')}>
          Bing
          <MicrosoftBing class="ml-auto text-muted-foreground" />
        </Menubar.Item>
        <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb('duckduckgo')}>
          DuckDuckGo
          <DuckDuckGo class="ml-3 text-muted-foreground" />
        </Menubar.Item>
        <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb('yahoo')}>
          Yahoo
          <Yahoo class="ml-auto text-muted-foreground" />
        </Menubar.Item>
        <Menubar.Item onclick={() => Notpad.searchOptions.searchOnWeb('brave')}>
          Brave Search
          <Brave class="ml-auto text-muted-foreground" />
        </Menubar.Item>
      </Menubar.SubContent>
    </Menubar.Sub>
  </Menubar.Content>
</Menubar.Menu>
