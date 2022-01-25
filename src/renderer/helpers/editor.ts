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

const defaultEditorViewExtensions = [
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
      extensions: defaultEditorViewExtensions,
    }),
    parent,
  });

  return editor;
}

export { setupEditor, defaultEditorViewExtensions, defaultTheme };
