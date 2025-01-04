import { Notpad } from '@/helpers/notpad';
import Quill from 'quill';
import { Range } from 'quill/core';

export class EditOptions {
  undo = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    editor.quill!.history.undo();
    Notpad.editors.focus(editorId);
  };

  redo = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    editor.quill!.history.redo();
    Notpad.editors.focus(editorId);
  };

  cut = async (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor.quill!;
    const selection = quill.getSelection()!;

    if (!selection) return;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardHtmlData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    const clipboardTextData = quill.getText(selection.index, selection.length);
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/plain': new Blob([clipboardTextData], { type: 'text/plain' }),
          'text/html': new Blob([clipboardHtmlData], { type: 'text/html' })
        })
      ])
      .catch((err) => {
        if (err instanceof Error) {
          err.message = 'Failed to cut to clipboard: ' + err.message;
        }
        Notpad.showError(err);
      });
    quill.deleteText(selection.index, selection.length);
    Notpad.editors.setSelection(editor.id, new Range(selection.index, 0), true);
  };

  copy = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    const selection = quill.getSelection()!;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardHtmlData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    const clipboardTextData = quill.getText(selection.index, selection.length);
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/plain': new Blob([clipboardTextData], { type: 'text/plain' }),
          'text/html': new Blob([clipboardHtmlData], { type: 'text/html' })
        })
      ])
      .catch((err) => {
        if (err instanceof Error) {
          err.message = 'Failed to copy to clipboard: ' + err.message;
        }
        Notpad.showError(err);
      });
    Notpad.editors.focus(editorId);
  };

  paste = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    const range = quill.getSelection();

    const handleRangeDeletion = (range: Range) => {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
    };

    const handleClipboardItem = (item: ClipboardItem, index: number) => {
      if (item.types.includes('text/html')) {
        item.getType('text/html').then((blob: Blob) => {
          blob.text().then((html: string) => {
            insertContent(index, html);
          });
        });
      } else if (item.types.includes('text/plain')) {
        item.getType('text/plain').then((blob: Blob) => {
          blob.text().then((text: string) => {
            insertContent(index, text);
          });
        });
      }
    };

    const insertContent = (index: number, content: string) => {
      quill.clipboard.dangerouslyPasteHTML(index, content);
      Notpad.editors.focus(editorId);
    };

    const handleClipboardError = (err: unknown) => {
      if (err instanceof Error) {
        err.message = 'Failed to read clipboard contents: ' + err.message;
      }
      Notpad.showError(err);
    };

    if (range) {
      handleRangeDeletion(range);
      navigator.clipboard
        .read()
        .then((items: ClipboardItems) => {
          items.forEach((item) => handleClipboardItem(item, range.index));
        })
        .catch(handleClipboardError);
    }
  };

  insertOrReplace = ({ editorId, content }: { editorId?: string; content: string }) => {
    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor.quill!;
    const range = quill.getSelection();

    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
    }

    const index = range?.index ?? 0;
    quill.insertText(index, content);
    // Move caret to the end of the inserted text
    Notpad.editors.setSelection(editor.id, new Range(index + content.length, 0), true);
  };

  delete = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    const range = quill.getSelection();

    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
    }
    Notpad.editors.focus(editorId);
  };

  selectAll = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor.quill!;
    Notpad.editors.setSelection(editor.id, new Range(0, quill.getLength()), true);
  };
}
