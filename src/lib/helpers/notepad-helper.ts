import { activeTabId, editors, type EditorData } from '@/store/store';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export class NotepadHelper {
  static createNew({ content, title }: Partial<EditorData> = {}) {
    const newId = uuidv4();
    editors.update((value) => {
      value.push({
        title: title ?? 'Untitled.txt',
        content: content ?? '',
        id: newId
      });

      return value;
    });
    activeTabId.update(() => newId);
  }

  static openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md';

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          const fileName = file.name;
          NotepadHelper.createNew({
            title: fileName,
            content
          });
        };

        reader.readAsText(file);
      }
    };

    input.click();
  }

  static remove(id: string) {
    let i = 0;
    let removeIndex = -1;
    editors.update((value) => {
      return value.filter((editor) => {
        if (editor.id == id) removeIndex = i;
        i++;
        return editor.id !== id;
      });
    });

    activeTabId.update((value) => {
      if (value === id && removeIndex > 0) {
        return get(editors)[removeIndex - 1]?.id ?? null;
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
