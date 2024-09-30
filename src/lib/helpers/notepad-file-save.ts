export class NotepadFileHelper {
    static async saveFile(content: string) {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: '.txt', // Use a default name for the file
                types: [
                    {
                        description: 'Text Documents (*.txt)',
                        accept: {
                            'text/plain': ['.txt'],
                        },
                    },
                ],
            });

            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            // alert('File saved successfully!'); // Remove alert to disable notification
        } catch (error) {
            console.error('Error saving the file:', error);
          // alert('Failed to save the file.'); // You can keep this alert for error handling if desired
        }
    }

    static async openFile(setContent: (content: string) => void) {
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'Text Documents (*.txt)',
                        accept: {
                            'text/plain': ['.txt'],
                        },
                    },
                ],
            });

            const file = await fileHandle.getFile();
            const content = await file.text();
            setContent(content);
        } catch (error) {
            console.error('Error opening file:', error);
            alert('Failed to open the file.');
        }
    }
}
