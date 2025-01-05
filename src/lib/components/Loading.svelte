<script lang="ts">
  import { fade } from 'svelte/transition';
  import AppLogo from '@/components/AppLogo.svelte';
</script>

<div
  transition:fade
  class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-40 flex
  animate-pulse flex-col items-center justify-center bg-muted"
></div>

<AppLogo
  class="fixed left-1/2 top-1/2 z-50 size-28 -translate-x-1/2 
  -translate-y-1/2 drop-shadow-md"
/>
