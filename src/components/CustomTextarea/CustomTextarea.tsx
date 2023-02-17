import { RootState } from "@/redux/store";
import { useEffect, cloneElement } from "react";
import { Box, Textarea } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import {
  NotepadState,
  setNotepad,
  updateNotepad,
} from "@/redux/reducers/notepad";
import useLocalStorage from "use-local-storage";
import { createEditor, Descendant, Editor, Transforms } from "slate";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import React, { useMemo } from "react";
import { htmlToSlate } from "slate-serializers";

export default function CustomTextarea() {
  const [notepadLocalStorage, setNotepadLocalStorage] = useLocalStorage<
    NotepadState | undefined
  >("notepad-state", undefined);
  const {
    content: notepadContent,
    name: notepadName,
    id: notepadId,
  } = useSelector((store: RootState) => store.notepad);
  const dispatch = useDispatch();
  const editor = useSlate();

  useEffect(() => {
    if (!notepadContent) return;
    if (!notepadName) return;
    if (!notepadId) return;
    setNotepadLocalStorage({
      content: notepadContent,
      name: notepadName,
      id: notepadId,
    });
  }, [notepadContent, notepadName, notepadId, setNotepadLocalStorage]);

  useEffect(() => {
    if (!notepadLocalStorage) return;
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });

    Transforms.removeNodes(editor, {
      at: [0],
    });

    Transforms.insertNodes(editor, notepadLocalStorage.content);

    dispatch(setNotepad(notepadLocalStorage));
  }, []);

  return (
    <>
      <Box
        component={Editable}
        color="neutral"
        sx={{
          flexGrow: 1,
          pl: 1,
          borderRadius: 0,
          maxHeight: "calc(100vh - 7rem)",
          shadow: "none",
          border: "0px solid transparent",
          "--Textarea-focusedHighlight": "rgba(0,0,0,0)",
          resize: "none",
          paddingY: 0,
          fontFamily: "monospace !important",
          bgcolor: "neutral.softBg",
          color: "neutral.softColor",
          overflowY: "scroll",
        }}
      />
      <Box
        component="input"
        type="file"
        onChange={e => {
          e.preventDefault();
          if (!e.target.files) return;

          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = e => {
            if (!e.target) return;
            let text = e.target.result;

            Transforms.delete(editor, {
              at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
              },
            });

            Transforms.removeNodes(editor, {
              at: [0],
            });

            Transforms.insertNodes(
              editor,
              (text as string).split("\r\n").map(line => ({
                type: "paragraph",
                children: [{ text: line }],
              }))
            );
          };
          reader.readAsText(file);
        }}
        name="open-file"
        id="open-file"
        hidden
        accept=".txt,.js,.html,.ts,.json,.md,.css,.scss,.sass,.less,.yml,.yaml,.xml,.jsx,.tsx,.mdx,.mdxjs,.mdown,.markdown,.markdn,.mkdn,.mkd,.mdwn,.mdtxt,.mdtext,.text,.rmd,.org,.rst,.adoc,.asciidoc,.ad,.asc,.creole,.mediawiki,.wiki,.rest,.pod,.pandoc,.ipynb,.tex,.latex,.ltx,.bib,.cls,.sty,.dtx,.ins,.lco,.dtx,.cfg,.ini,.conf,.properties,.prop,.toml,.tmlanguage"
      />
    </>
  );
}
