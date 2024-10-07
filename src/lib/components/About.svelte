<script context="module">
  import { writable } from 'svelte/store';
  const open = writable(false);

  export function openAbout() {
    open.set(true);
  }
</script>

<script>
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import favIcon from '../../assets/imgs/favicon.png';
  import favIconDark from '../../assets/imgs/favicon-dark.png';

  import { mode } from 'mode-watcher';
  $: console.log(open);
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Title>About Notpad</Dialog.Title>
    <hr />

    {#if $mode == 'dark'}
      <img alt="icon" src={favIconDark} />
    {:else}
      <img alt="icon" src={favIcon} />
    {/if}

    <Dialog.Header class="m-10 ">
      NotPad <br />
      Version 22H2 <br />
      @ Muhammed Rahif. All rights reserved.
    </Dialog.Header>
    <Dialog.Description>Description...</Dialog.Description>

    <Dialog.Footer>
      <Dialog.Footer>
        <Button type="button" class="bg-gray-500" on:click={() => open.set(false)}>Okay</Button>
      </Dialog.Footer>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
