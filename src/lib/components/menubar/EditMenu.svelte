<script lang="ts">
  import * as Menubar from '@/components/ui/menubar';
  import EditMenuItems from '@/components/EditMenuItems.svelte';
</script>

<Menubar.Menu>
  <Menubar.Trigger>Edit</Menubar.Trigger>
  <Menubar.Content>
    <EditMenuItems type="menubar" />
  </Menubar.Content>
</Menubar.Menu>
