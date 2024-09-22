<script lang="ts">
  import AppMenuBar from '@/components/AppMenuBar.svelte';
  import Textarea from '@/components/ui/textarea/textarea.svelte';
</script>

<AppMenuBar />
<Textarea
  class="relative h-full w-full resize-none rounded-none !border-none bg-transparent text-base !outline-none !ring-0 "
  spellcheck={false}
/>
