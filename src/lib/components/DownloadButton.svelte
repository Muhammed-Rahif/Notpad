<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import appJson from '@/src/app.json';
  import { Notpad } from '@/helpers/notpad';

  const downloadOptions = {
    'Linux (.deb)':
      'https://github.com/Muhammed-Rahif/Notpad/releases/download/v1.0.0-alpha.1/notpad_1.0.0-1_amd64.deb',
    'Linux (.rpm)':
      'https://github.com/Muhammed-Rahif/Notpad/releases/download/v1.0.0-alpha.1/notpad-1.0.0-1-1.x86_64.rpm',
    'Windows (.exe)':
      'https://github.com/Muhammed-Rahif/Notpad/releases/download/v1.0.0-alpha.1/Notpad_1.0.0-1_x64-setup.exe',
    'Windows (.msi)':
      'https://github.com/Muhammed-Rahif/Notpad/releases/download/v1.0.0-alpha.1/Notpad_1.0.0.1_x64_en-US.msi',
    'MacOs (.dmg)':
      'https://github.com/Muhammed-Rahif/Notpad/releases/download/v1.0.0-alpha.1/Notpad_1.0.0-1_universal.dmg',
    'Source Code (.zip)':
      'https://github.com/Muhammed-Rahif/Notpad/archive/refs/tags/v1.0.0-alpha.1.zip',
    'Surce Code (.tar.gz)':
      'https://github.com/Muhammed-Rahif/Notpad/archive/refs/tags/v1.0.0-alpha.1.tar.gz'
  };
</script>

{#await Notpad.github.getReleases() then releases}
  <Menubar.Menu>
    <Menubar.Trigger class="absolute right-1 top-1/2 -translate-y-1/2 transform"
      >
      Download
      </Menubar.Trigger
    >
    <Menubar.Content>
      {#each Object.entries(downloadOptions) as [text, downloadLink]}
        <Menubar.Item>
          <a href={downloadLink} download={downloadLink}>{text}</a>
        </Menubar.Item>
      {/each}
    </Menubar.Content>
  </Menubar.Menu>
{/await}
