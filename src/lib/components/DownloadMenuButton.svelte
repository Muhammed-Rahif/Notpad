<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import WindowsIcon from '@/components/icons/Windows.svelte';
  import LinuxIcon from '@/components/icons/Linux.svelte';
  import MacOSIcon from '@/components/icons/MacOS.svelte';
  import DownloadIcon from '@/components/icons/Download.svelte';
  import { slide } from 'svelte/transition';

  function getContentForDownloadUrl(fileUrl: string, versionName: string) {
    const fileName = fileUrl.split('/').pop();
    if (fileName?.endsWith('.deb')) return { text: `Linux (${versionName}.deb)`, icon: LinuxIcon };
    if (fileName?.endsWith('.rpm')) return { text: `Linux (${versionName}.rpm)`, icon: LinuxIcon };
    if (fileName?.endsWith('.exe'))
      return { text: `Windows (${versionName}.exe)`, icon: WindowsIcon };
    if (fileName?.endsWith('.msi'))
      return { text: `Windows (${versionName}.msi)`, icon: WindowsIcon };
    if (fileName?.endsWith('.dmg')) return { text: `MacOS (${versionName}.dmg)`, icon: MacOSIcon };
    if (fileName?.endsWith('.zip'))
      return { text: `Source Code (${versionName}.zip)`, icon: LinuxIcon };
    if (fileName?.endsWith('.tar.gz'))
      return { text: `Source Code (${versionName}.tar.gz)`, icon: LinuxIcon };
    return { text: `Download`, icon: DownloadIcon };
  }
</script>

{#await Notpad.github.getReleases() then releases}
  {#if releases}
    {@const latestRelease = releases
      .filter((release) => !release.draft)
      .sort((a, b) => (a.published_at > b.published_at ? -1 : 1))[0]}
    {@const latestAssets = latestRelease.assets}

    <div
      transition:slide|global
      class="absolute right-1 top-1/2 -translate-y-1/2 transform max-lg:hidden"
    >
      <Menubar.Menu>
        <Menubar.Trigger>Download</Menubar.Trigger>
        <Menubar.Content>
          {#each latestAssets as asset}
            {@const { text, icon: Icon } = getContentForDownloadUrl(asset.name, latestRelease.name)}
            <a href={asset.browser_download_url} download={asset.browser_download_url}>
              <Menubar.Item class="flex items-center justify-between gap-3">
                {text}
                <Icon />
              </Menubar.Item>
            </a>
          {/each}
        </Menubar.Content>
      </Menubar.Menu>
    </div>
  {/if}
{/await}
