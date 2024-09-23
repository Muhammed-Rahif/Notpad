import { activeTabId, editors } from '@/store/store';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export class EditorHelper {
  static createNew() {
    editors.update((value) => {
      value.push({
        name: 'Untitled',
        content: '',
        id: uuidv4()
      });

      return value;
    });
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
}
