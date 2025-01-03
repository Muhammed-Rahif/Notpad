<script lang="ts">
  import { fade } from 'svelte/transition';
  import appIconLight from '@/src/assets/images/Notpad Logo Light.svg';
  import appIconDark from '@/src/assets/images/Notpad Logo Dark.svg';
  import { Notpad } from '../helpers/notpad';

  const settings = Notpad.stores.settings;
</script>

<div
  transition:fade
  class="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex
  flex-col items-center justify-center bg-primary-foreground"
>
  <img
    class="w-20 animate-pulse"
    alt="icon"
    src={$settings.theme == 'dark' ? appIconDark : appIconLight}
  />
</div>
