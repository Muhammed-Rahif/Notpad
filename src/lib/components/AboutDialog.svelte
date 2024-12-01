<script module>
  import { writable } from 'svelte/store';

  const open = writable(false);

  export function openAboutDialog() {
    open.set(true);
  }
</script>

<script lang="ts">
  import { Button } from '@/components/ui/button';
  import * as Dialog from '@/components/ui/dialog';
  import appIconLight from '@/src/assets/images/Notpad Logo Light.svg';
  import appIconDark from '@/src/assets/images/Notpad Logo Dark.svg';
  import GitHubIcon from '@/src/lib/components/icons/GitHub.svelte';
  import Separator from '@/components/ui/separator/separator.svelte';
  import { Badge } from '@/components/ui/badge';
  import { openLicenseDialog } from '@/components/LicenseDialog.svelte';
  import { mode } from 'mode-watcher';
  import { Notpad } from '@/helpers/notpad';
  import { slide } from 'svelte/transition';
  import appJson from '@/src/app.json';
  import { tick } from 'svelte';

  function closeDialog() {
    open.set(false);
  }

  async function showLicense() {
    closeDialog();
    await tick();
    openLicenseDialog();
  }

  function openGithubRepo(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    window.open('https://github.com/Muhammed-Rahif/Notpad', '_blank');
  }
</script>

<Dialog.Root open={$open} onOpenChange={open.set}>
  <Dialog.Content class="max-w-2xl overflow-y-auto [&_a]:text-blue-500">
    <Dialog.Header>
      <Dialog.Title>About Notpad</Dialog.Title>
    </Dialog.Header>

    <div class="max-h-[60vh] overflow-y-auto pr-3 text-base">
      <div class="mb-3 flex flex-row items-center justify-start gap-4 text-left">
        <img class="w-20" alt="icon" src={$mode == 'dark' ? appIconDark : appIconLight} />

        <div>
          <span class="text-xl font-bold">Notpad</span><br />
          Version {appJson.version}<br />
          <a href="https://github.com/Muhammed-Rahif" target="_blank">Muhammed-Rahif</a>
          <span class="text-sm">© 2024. All rights reserved.</span>
        </div>
      </div>

      <p class="mb-3">
        Notpad is a simple, open source, beautiful note-taking app that helps you to take notes and
        organize your thoughts. It is designed to be minimal and distraction-free, so you can focus
        on your ideas. Notpad is an open-source project. You can contribute to the project by fixing
        bugs, improving the codebase, or adding new features. The project is hosted on
        <a href="https://github.com/Muhammed-Rahif/Notpad/" target="_blank">GitHub.</a>
        If you have any questions, feedback, or suggestions, feel free to
        <a href="https://github.com/Muhammed-Rahif/Notpad/issues/new/" target="_blank">
          create an issue.
        </a>
      </p>

      {#await Notpad.github.getContributors() then contributors}
        {#if contributors}
          <div in:slide|global>
            <p>Our Valuable Contributors:</p>
            <ul class="mt-1">
              {#each contributors as contributor}
                {@const isAuthor = contributor.login == 'Muhammed-Rahif'}
                <a href={contributor.html_url} target="_blank">
                  <li class="flex w-full flex-row items-center justify-start gap-2 pr-2">
                    <img
                      class="h-8 w-8 rounded-full"
                      src={contributor.avatar_url}
                      alt={contributor.login}
                    />
                    <p>
                      {contributor.login}
                      <span class="block text-xs text-foreground">
                        {contributor.contributions}
                        {contributor.contributions == 1 ? 'contribution' : 'contributions'}
                      </span>
                    </p>
                    <Badge
                      variant={isAuthor ? 'default' : 'outline'}
                      class="ml-auto {isAuthor ? 'bg-green-500' : ''}"
                    >
                      {isAuthor ? 'Author' : 'Contributor'}
                    </Badge>
                  </li>
                </a>
                <Separator class="my-1 first:hidden last:hidden" />
              {/each}
            </ul>
            <p class="mt-1 text-sm">
              Want to contribute? Begin here:
              <a
                href="https://github.com/Muhammed-Rahif/Notpad/blob/main/CONTRIBUTING.md"
                target="_blank"
              >
                CONTRIBUTING.md
              </a>
            </p>
          </div>
        {/if}
      {/await}
      <p class="mt-2 text-right">
        <small>
          This product is licenced under the MIT license to
          <a href="https://github.com/Muhammed-Rahif" target="_blank">Muhammed-Rahif.</a>
        </small>
      </p>
    </div>

    <Dialog.Footer class="gap-y-2">
      <Button variant="secondary" class="relative sm:pr-20" onclick={showLicense}>
        Notpad License

        <Button
          variant="secondary"
          class="absolute right-0 rounded-l-none border-l border-l-foreground/10"
          onclick={openGithubRepo}
        >
          <GitHubIcon class="text-2xl" />
        </Button>
      </Button>

      <Button onclick={closeDialog}>Okay!</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
