import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView, keymap } from '@codemirror/view';

const defaultTheme = EditorView.theme(
  {
    '.cm-content, .cm-gutter': { minHeight: 'calc(100vh - 82px)' },
  },
  { dark: false }
);

const defaultExtensions = [
  basicSetup,
  keymap.of([indentWithTab]),
  defaultTheme,
  markdown(),
];

function setupEditor(
  parent: Element | DocumentFragment | undefined
): EditorView {
  const editor = new EditorView({
    state: EditorState.create({
      extensions: defaultExtensions,
    }),
    parent,
  });

  return editor;
}

export { setupEditor, defaultExtensions, defaultTheme };
