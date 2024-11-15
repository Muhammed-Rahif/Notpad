<script context="module">
    import { writable } from 'svelte/store';
  
    const open = writable(false);
  
    export function openGithubRepo() {
      open.set(true);
      window.open('https://github.com/Muhammed-Rahif/Notpad', '_blank');
    }
  </script>
  
  <a 
    href="https://github.com/Muhammed-Rahif/Notpad" 
    target="_blank" 
    on:click|preventDefault={openGithubRepo}
    class="text-blue-500 underline"
  >
    Visit GitHub Repository
  </a>
  