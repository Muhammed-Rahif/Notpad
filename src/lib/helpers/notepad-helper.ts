import { activeTabId, editors } from '@/store/store';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export class NotepadHelper {
  static createNew() {
    const newId = uuidv4();
    editors.update((value) => {
      value.push({
        title: 'Untitled',
        content: '',
        id: newId
      });

      return value;
    });
    activeTabId.update(() => newId);
  }

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
          console.log(content);
        };

        reader.readAsText(file);
      }
    };

    input.click();
  }

  static remove(id: string) {
    editors.update((value) => {
      return value.filter((editor) => editor.id !== id);
    });
    activeTabId.update((value) => {
      if (value === id) {
        return get(editors)[0].id;
      }
      return value;
    });
  }

  static updateContent(id: string, content: string) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === id) {
          editor.content = content;
        }
        return editor;
      });
    });
  }

  static updateTitle(id: string, title: string) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === id) {
          editor.title = title;
        }
        return editor;
      });
    });
  }
}
