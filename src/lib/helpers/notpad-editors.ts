import { activeTabId, editors, textareaRef, type EditorData } from '@/store/store';
import { get } from 'svelte/store';
import { generate as genId } from 'short-uuid';
import { toast } from 'svelte-sonner';

/**
 * A helper class for performing various editor-related tasks such as opening
 * a new editor, removing an editor, etc.
 */
export class NotpadEditors {
  createNew({ content, fileName, fileHandle }: Partial<EditorData> = {}) {
    const newId = genId();
    editors.update((value) => {
      value.push({
        fileName: fileName ?? 'Untitled.txt',
        content: content ?? '',
        id: newId,
        fileHandle,
        undoStack:[''],
        redoStack:[''],
        saved: true,
      });

      return value;
    });
    activeTabId.update(() => newId);
  }

  remove(editorId: string) {
    let i = 0;
    let removeIndex = -1;
    editors.update((value) => {
      return value.filter((editor) => {
        if (editor.id == editorId) removeIndex = i;
        i++;
        return editor.id !== editorId;
      });
    });

    activeTabId.update((value) => {
      if (value === editorId && removeIndex > 0) {
        return get(editors)[removeIndex - 1]?.id ?? null;
      }
      return value;
    });
  }

  updateContent(id: string, content: string) {
    editors.update((value) => {
      return value.map((editor)=>{
        if (editor.id === id) {
          editor.content = content;
          editor.undoStack = [...editor.undoStack, editor.content];
          editor.redoStack = [];
          editor.saved = false;
        }
        return editor;
      })
    });
  }

  updateFileName(editorId: string, fileName: string) {
    editors.update((value) => {
      return value.map((editor) => {
        if (editor.id === editorId) {
          editor.fileName = fileName;
        }
        return editor;
      });
    });
    toast.success(`Title updated to "${fileName}"`);
  }

  getActive(): EditorData | undefined {
    const activeId = get(activeTabId);
    const editorsList = get(editors);
    return editorsList.find((editor) => editor.id === activeId);
  }

  updateFileHandle(editorId: string, fileHandle: FileSystemFileHandle) {
    editors.update((value) => {
      return value.map((e) => {
        if (e.id === editorId) {
          return { ...e, fileHandle, fileName: fileHandle.name };
        }
        return e;
      });
    });
  }

  undo () {
    editors.update((value) => {
        return value.map((editor) => {
            const previousContent = editor.undoStack[editor.undoStack.length - 1];
            if(editor.saved||editor.undoStack.length===0)
              return editor;
            return {
                ...editor,
                content: previousContent,
                undoStack: editor.undoStack.slice(0, -1),
                redoStack: [editor.content, ...editor.redoStack],
            };
        });
    });
};
 redo (){
  editors.update((value) => {
    return value.map((editor) => {
      const nextContent = editor.redoStack[0];
      return {
       ...editor,
        content: nextContent,
        undoStack: [...editor.undoStack, editor.content],
        redoStack: editor.redoStack.slice(1),
      };
    });
  });
 }

 selectAllText() {
  textareaRef.update((textarea) => {
    if (textarea) {
      textarea.select();
    }
    return textarea;
  });
}

cutText() {
  const textarea = get(textareaRef);
  if (textarea) {
    textarea.focus();
    document.execCommand('cut'); 
  } else {
    console.warn('Textarea is not available');
  }
}

async pasteText() {
  const textarea = get(textareaRef); 
  if (textarea) {
    textarea.focus();
    if (navigator.clipboard) {
      // Use modern Clipboard API
      const text = await navigator.clipboard.readText();
      const { selectionStart, selectionEnd } = textarea;
      textarea.setRangeText(text, selectionStart, selectionEnd, 'end');
    } else {
      document.execCommand('paste');
    }
  } else {
    console.warn('Textarea is not available');
  }
}

insertDateTime() {
  const currentDateTime = new Date().toLocaleString();
  const activeId = get(activeTabId);
  editors.update((value) => {
    return value.map((editor) => {
      if (editor.id === activeId) {
        editor.content += `\n${currentDateTime}`;
        editor.undoStack = [...editor.undoStack, editor.content];
        editor.redoStack = [];
        editor.saved = false;
      }
      return editor;
    });
  });
  textareaRef.update((textarea) => {
    if (textarea) {
      textarea.focus();
    }
    return textarea;
  });
}
}
