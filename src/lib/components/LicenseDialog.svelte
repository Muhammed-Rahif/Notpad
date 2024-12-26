<script>
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import { onMount } from 'svelte';
  import { Notpad } from '@/helpers/notpad';
  import license from '@/src/../LICENSE.txt?inline';

  let licenseText = $state(atob(license.replace('data:text/plain;base64,', '')));
  let licenseParagraphs = $derived(
    licenseText.split(/\n\n/g).map((line) => {
      return { text: line, br: true };
    })
  );

  const open = Notpad.dialogs.license;

  onMount(async () => {
    licenseText = (await Notpad.github.getAppLicense()) ?? licenseText;
  });
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="[&_a]:text-blue-500">
    <Dialog.Header>
      <Dialog.Title>Notpad License</Dialog.Title>
    </Dialog.Header>

    <Dialog.Description class="max-h-96 overflow-y-auto pr-2">
      {#each licenseParagraphs as { text, br }}
        {text}

        {#if br}
          <br />
          <br />
        {/if}
      {/each}
    </Dialog.Description>
    <Dialog.Footer>
      <Button type="button" onclick={() => open.set(false)}>Understood!</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
