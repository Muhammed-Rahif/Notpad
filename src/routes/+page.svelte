<script lang="ts" context="module">
  import AppMenuBar from '@/components/AppMenuBar.svelte';
  import SaveDialog from '@/components/SaveDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
  import Textarea from '@/components/ui/textarea/textarea.svelte';
  import { writable } from 'svelte/store';

  export let textarea = writable('');
</script>

<!-- Procdually -->
<SaveDialog />
<Shortcuts />

<!-- Actual UI -->
<AppMenuBar />
<Textarea
  bind:value={$textarea}
  class="relative h-full w-full resize-none rounded-none !border-none bg-transparent text-base !outline-none !ring-0 "
  spellcheck={false}
/>
