<script>
  import { ModeWatcher, mode } from 'mode-watcher';
  import '../app.css';
  import favIcon from '$lib/assets/imgs/favicon.png';
  import favIconDark from '$lib/assets/imgs/favicon-dark.png';
</script>

<ModeWatcher />
<slot></slot>

<svelte:head>
  {#if $mode == 'dark'}
    <link rel="icon" href={favIconDark} />
  {:else}
    <link rel="icon" href={favIcon} />
  {/if}
</svelte:head>
