import { toast } from 'svelte-sonner';
import { Notpad } from '../notpad';
import { Range } from 'quill';
import { isTauri } from '@/src/lib';
import { open as tauriLaunchUrl } from '@tauri-apps/plugin-shell';

export class SearchOptions {
  public searchOnWeb = (editorId?: string) => {
    const editor = Notpad.editors.getEditor(editorId);
    if (!editor) return;

    const selection = editor?.quill?.getSelection();
    if (!selection) return;

    let selectedText = editor.quill?.getText(selection);
    selectedText = selectedText?.trim();
    if (!selectedText) return Notpad.showError('Please select some text to search on the web.');

    const url = `https://www.google.com/search?q=${encodeURIComponent(selectedText)}`;

    if (isTauri) {
      tauriLaunchUrl(url);
    } else {
      window.open(url, '_blank');
    }
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
      return Notpad.showError('Line must be >= 1.');
    }
    if (column !== undefined && column < 0) {
      return Notpad.showError('Column must be non-negative.');
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

  public findMaybeReplace = ({
    query,
    editorId,
    caseSensitive = false,
    index = 0,
    replace
  }: {
    query: string;
    replace?: string;
    editorId?: string;
    index?: number;
    caseSensitive?: boolean;
  }) => {
    if (!query)
      return Notpad.showError('Search term cannot be empty. Please enter a valid search term.');

    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor?.quill;
    if (!quill) return Notpad.showError('Editor not found.');

    const text = quill.getText();
    const matches: number[] = [];

    let startIndex = 0;
    while (true) {
      startIndex = caseSensitive
        ? text.indexOf(query, startIndex)
        : text.toLowerCase().indexOf(query.toLowerCase(), startIndex);

      if (startIndex === -1) break;
      matches.push(startIndex);
      startIndex += query.length;
    }

    if (matches.length === 0)
      return Notpad.showError(`The term "${query}" was not found in the document.`);

    let validIndex;
    if (index >= 0 && index < matches.length) {
      validIndex = index;
    } else if (index > matches.length) {
      validIndex = 0;
    } else if (index < 0) {
      validIndex = matches.length - 1;
    } else {
      validIndex = 0;
    }

    const matchPosition = matches[validIndex];

    quill.setSelection(matchPosition, query.length);

    if (typeof replace == 'string') {
      quill.deleteText(matchPosition, query.length);
      quill.insertText(matchPosition, replace);
      quill.setSelection(matchPosition, replace.length);
    } else {
      quill.setSelection(matchPosition, query.length);
    }

    return validIndex;
  };

  public findAndReplaceAll = ({
    query,
    editorId,
    replace,
    caseSensitive = false
  }: {
    query: string;
    replace: string;
    editorId?: string;
    caseSensitive?: boolean;
  }) => {
    if (!query)
      return Notpad.showError('Search term cannot be empty. Please enter a valid search term.');

    const editor = Notpad.editors.getEditor(editorId);
    const quill = editor?.quill;
    if (!quill) return Notpad.showError('Editor not found.');

    let text = quill.getText();
    let startIndex = caseSensitive
      ? text.indexOf(query)
      : text.toLowerCase().indexOf(query.toLowerCase());

    if (startIndex === -1)
      return Notpad.showError(`The term "${query}" was not found in the document.`);

    let count = 0;
    while (startIndex !== -1) {
      quill.deleteText(startIndex, query.length);
      quill.insertText(startIndex, replace);

      text = quill.getText();
      startIndex = caseSensitive
        ? text.indexOf(query)
        : text.toLowerCase().indexOf(query.toLowerCase());
      count++;
    }

    return toast.success(`Replaced ${count} occurrences of "${query}" with "${replace}".`);
  };
}
