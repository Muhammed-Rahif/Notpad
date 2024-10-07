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

  cut = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    const selection = quill.getSelection()!;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/html': new Blob([clipboardData], { type: 'text/html' })
        })
      ])
      .catch((err) => {
        if (err instanceof Error) {
          err.message = 'Failed to cut to clipboard: ' + err.message;
        }
        Notpad.showError(err);
      });
    quill.deleteText(selection.index, selection.length);
    Notpad.editors.focus(editorId);
  };

  copy = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    const selection = quill.getSelection()!;
    const selectedContent = quill.getContents(selection.index, selection.length);
    const tempCont = document.createElement('div');
    new Quill(tempCont).setContents(selectedContent);
    const clipboardData = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
    navigator.clipboard
      .write([
        new ClipboardItem({
          'text/html': new Blob([clipboardData], { type: 'text/html' })
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
    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
      navigator.clipboard
        .read()
        .then((items) => {
          for (const item of items) {
            if (item.types.includes('text/html')) {
              item.getType('text/html').then((blob) => {
                blob.text().then((html) => {
                  quill.clipboard.dangerouslyPasteHTML(range.index, html);
                  Notpad.editors.focus(editorId);
                });
              });
            } else if (item.types.includes('text/plain')) {
              item.getType('text/plain').then((blob) => {
                blob.text().then((text) => {
                  quill.clipboard.dangerouslyPasteHTML(range.index, text);
                  Notpad.editors.focus(editorId);
                });
              });
            }
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            err.message = 'Failed to read clipboard contents: ' + err.message;
          }
          Notpad.showError(err);
        });
    }
  };

  selectAll = (editorId?: string) => {
    const quill = Notpad.editors.getEditor(editorId).quill!;
    quill.setSelection(0, quill.getLength());
    Notpad.editors.focus(editorId);
  };

  insertDateAndTime = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor.quill!;
    const date = new Date().toLocaleString();
    const range = quill.getSelection();
    if (range) {
      // Delete the selected text if any
      if (range.length > 0) {
        quill.deleteText(range.index, range.length);
      }
    }
    const index = range?.index ?? 0;
    quill.insertText(index, date);
    // Move caret to the end of the inserted text
    Notpad.editors.updateSelection(editor.id, new Range(index + date.length, range?.length));
    Notpad.editors.focus(editorId);
  };
}
