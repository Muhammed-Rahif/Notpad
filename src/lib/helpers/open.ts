export class NotepadFile {
    static openFile() {
     const input = document.createElement('input');
    input.type = 'file';
   input.accept = '.txt'; 

input.onchange = (event: Event) => {
    const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
         const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
       
   //     console.log(content); 
      };
      
         reader.readAsText(file);
    }
  };

     input.click();
}
};
