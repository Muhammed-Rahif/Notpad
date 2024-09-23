<script lang="ts" context="module">
  import AppMenuBar from '@/components/AppMenuBar.svelte';
  import Editors from '@/components/Editors.svelte';
  import SaveDialog from '@/components/SaveDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
</script>

<!-- Procdually -->
<SaveDialog />
<Shortcuts />

<!-- Actual UI -->
<AppMenuBar />
<Editors />
