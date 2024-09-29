<script lang="ts">
  import { NotepadHelper } from '@/helpers/notepad-helper';
  import { NotepadFileHelper } from '@/helpers/notepad-file-save'; 
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
  

  
  let currentEditorContent = ""; // Define the variable to hold editor content

  



  function dispatch(d: ShortcutEventDetail, cb: () => void) {
    d.originalEvent.preventDefault();
    return cb();
  }

   // Function to save the current content
   async function saveCurrentFile() {
    await NotepadFileHelper.saveFile(currentEditorContent);
  }
</script>


<svelte:window
  use:shortcut={{
    trigger: [
      {
      key: 'n',
      modifier: window.isNeutralino ? ['ctrl'] : ['ctrl', 'alt'],
      callback: (d) => dispatch(d, NotepadHelper.createNew)
    },
    {
        key: 's',
        modifier: ['ctrl'],
        callback: (d) => dispatch(d, () => NotepadFileHelper.saveFile(currentEditorContent))
      },
   
    ]
    
   
  }}
/>
