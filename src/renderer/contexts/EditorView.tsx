import { EditorView } from '@codemirror/basic-setup';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { setupEditor } from '../helpers/editor';

interface EditorViewContextType {
  editorView: EditorView;
  setEditorView: React.Dispatch<React.SetStateAction<EditorView>>;
}

export const EditorViewContext = createContext<EditorViewContextType>(
  {} as EditorViewContextType
);

export default function EditorViewProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [editorView, setEditorView] = useState<EditorView>({} as EditorView);

  useEffect(() => {
    const myEditor = setupEditor(
      document.querySelector('.text-box-wrapper') || undefined
    );
    setEditorView(myEditor);
    myEditor.focus();
  }, []);

  return (
    <EditorViewContext.Provider value={{ editorView, setEditorView }}>
      {children}
    </EditorViewContext.Provider>
  );
}
