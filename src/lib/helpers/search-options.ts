import { toast } from 'svelte-sonner';
import { Notpad } from './notpad';
import { Range } from 'quill';

export class SearchOptions {
  public findOnWeb = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    if (!editor) return;

    const selection = editor?.quill?.getSelection();
    if (!selection) return;

    let selectedText = editor.quill?.getText(selection);
    selectedText = selectedText?.trim();
    if (!selectedText) return toast.error('Please select some text to search on the web.');

    const url = `https://www.google.com/search?q=${encodeURIComponent(selectedText)}`;
    window.open(url, '_blank');
  };

  public goTo = ({
    editorId,
    line,
    column
  }: {
    editorId?: string;
    line?: number;
    column?: number;
  }) => {
    if (line !== undefined && line < 1) {
      return toast.error('Line must be >= 1.');
    }
    if (column !== undefined && column < 0) {
      return toast.error('Column must be non-negative.');
    }

    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor.quill;
    if (!quill) return;

    const selection = editor.selection;
    if (!selection) return;

    const text = quill.getText();
    let currentLine = 1;
    let currentOffset = 0;

    if (!column) column = 0;
    if (!line) {
      line = 1;
      for (let i = 0; i < selection.index; i++) {
        if (text[i] === '\n') {
          line++;
        }
      }
    }

    // Iterate over each character to find the line
    for (let i = 0; i < text.length; i++) {
      if (currentLine == line) {
        // Once the line is found, calculate the target offset (column)
        let targetOffset = currentOffset + column;

        // Ensure column number is within bounds of the line length
        const lineEndIndex = text.indexOf('\n', currentOffset);
        if (targetOffset > lineEndIndex && lineEndIndex !== -1) {
          targetOffset = lineEndIndex; // Move to the end of the line
        }

        Notpad.editors.setSelection(editor.id, new Range(targetOffset - 1, 0), true);
        return;
      }

      if (text[i] === '\n') {
        currentLine++;
      }
      currentOffset++;
    }

    Notpad.editors.focus(editorId);
  };
}
