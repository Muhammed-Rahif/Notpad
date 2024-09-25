<script lang="ts" context="module">
  import MenuBar from '@/components/MenuBar.svelte';
  import Editors from '@/components/Editors.svelte';
  import SaveDialog from '@/components/SaveDialog.svelte';
  import Shortcuts from '@/components/Shortcuts.svelte';
</script>

<!-- Procdually -->
<SaveDialog />
<Shortcuts />

<!-- Actual UI -->
<MenuBar />
<Editors />
