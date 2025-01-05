<script lang="ts">
  import { fade } from 'svelte/transition';
  import AppLogo from '@/components/AppLogo.svelte';
</script>

<div
  transition:fade
  class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex
  flex-col items-center justify-center bg-popover"
>
  <AppLogo class="animate-pulse" />
</div>
