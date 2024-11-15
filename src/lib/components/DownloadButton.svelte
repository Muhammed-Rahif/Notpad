<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import { Notpad } from '@/helpers/notpad';
  import WindowsIcon from '@/components/icons/Windows.svelte';
  import LinuxIcon from '@/components/icons/Linux.svelte';
  import MacOSIcon from '@/components/icons/MacOS.svelte';
  import DownloadIcon from '@/components/icons/Download.svelte';

  function getContentForDownloadUrl(fileUrl: string) {
    const fileName = fileUrl.split('/').pop();
    if (fileName?.endsWith('.deb')) return { text: 'Linux (.deb)', icon: LinuxIcon };
    if (fileName?.endsWith('.rpm')) return { text: 'Linux (.rpm)', icon: LinuxIcon };
    if (fileName?.endsWith('.exe')) return { text: 'Windows (.exe)', icon: WindowsIcon };
    if (fileName?.endsWith('.msi')) return { text: 'Windows (.msi)', icon: WindowsIcon };
    if (fileName?.endsWith('.dmg')) return { text: 'MacOS (.dmg)', icon: MacOSIcon };
    if (fileName?.endsWith('.zip')) return { text: 'Source Code (.zip)', icon: LinuxIcon };
    if (fileName?.endsWith('.tar.gz')) return { text: 'Source Code (.tar.gz)', icon: LinuxIcon };
    return { text: 'Download', icon: DownloadIcon };
  }
</script>

{#await Notpad.github.getReleases() then releases}
  {#if releases}
    {@const assets = releases
      .flatMap((release) => release.assets)
      .sort((a, b) => a.name.localeCompare(b.name))}

    <Menubar.Menu>
      <Menubar.Trigger class="absolute right-1 top-1/2 -translate-y-1/2 transform">
        Download
      </Menubar.Trigger>
      <Menubar.Content>
        {#each assets as asset}
          {@const { text, icon: Icon } = getContentForDownloadUrl(asset.name)}
          <a href={asset.browser_download_url} download={asset.browser_download_url}>
            <Menubar.Item class="flex items-center justify-between">
              {text}

              <Icon class="text-xl" />
            </Menubar.Item>
          </a>
        {/each}
      </Menubar.Content>
    </Menubar.Menu>
  {/if}
{/await}
