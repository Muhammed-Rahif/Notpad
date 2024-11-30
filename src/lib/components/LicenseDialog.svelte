<script context="module">
  import { writable } from 'svelte/store';

  const open = writable(false);

  export function openLicenseDialog() {
    open.set(true);
  }
</script>

<script>
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import { onMount } from 'svelte';
  import { Notpad } from '@/helpers/notpad';

  let licenseText = `MIT License

Copyright (c) 2024 Muhammed Rahif

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  $: licenseParagraphs = licenseText.split(/\n\n/g).map((line) => {
    return { text: line, br: '<br><br>' };
  });

  onMount(async () => {
    licenseText = (await Notpad.github.getAppLicense()) ?? licenseText;
  });
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="[&_a]:text-blue-500">
    <Dialog.Title>Notpad License</Dialog.Title>
    <hr />
    <Dialog.Description class="max-h-96 overflow-y-auto pr-2">
      {#each licenseParagraphs as { text, br }}
        {text}
        {br}
      {/each}
    </Dialog.Description>
    <Dialog.Footer>
      <Button type="button" on:click={() => open.set(false)}>Understood!</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
