import { RootState } from "@/redux/store";
import { useEffect, cloneElement, useCallback } from "react";
import { Box, Textarea } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import {
  NotepadState,
  setNotepad,
  updateNotepad,
} from "@/redux/reducers/notepad";
import useLocalStorage from "use-local-storage";
import {
  createEditor,
  Descendant,
  Editor,
  Node,
  NodeEntry,
  Text,
  Transforms,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  useFocused,
  RenderLeafProps,
} from "slate-react";
import React, { useMemo } from "react";
import { htmlToSlate } from "slate-serializers";
import { css } from "@emotion/css";
import Prism, { Token } from "prismjs";
import "prismjs/components/prism-markdown";

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
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

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

  const decorate = useCallback(([node, path]: NodeEntry<Node>) => {
    const ranges: any[] = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token: Prism.Token | string) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return (token.content as any).reduce(
          (l: any, t: string | Prism.Token) => l + getLength(t),
          0
        );
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
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
        renderLeaf={renderLeaf}
        decorate={decorate}
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

const Leaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps & { leaf: any }) => {
  console.log(Object.keys(leaf));

  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && "bold"};
        font-style: ${leaf.italic && "italic"};
        text-decoration: ${leaf.underlined && "underline"};
        ${leaf.title &&
        css`
          display: inline-block;
          font-weight: bold;
          font-size: 20px;
          margin: 20px 0 10px 0;
        `}
        ${leaf.list &&
        css`
          padding-left: 10px;
          font-size: 20px;
          line-height: 10px;
        `}
        ${leaf.url &&
        css`
          color: dodgerblue;
          opacity: 0.86;
        `}
        ${leaf.hr &&
        css`
          display: block;
          text-align: center;
          border-bottom: 2px solid #ddd;
        `}
        ${leaf.blockquote &&
        css`
          display: inline-block;
          border-left: 2px solid #ddd;
          padding-left: 10px;
          color: #aaa;
          font-style: italic;
        `}
        ${leaf.code &&
        css`
          font-family: monospace !important;
          background-color: #eee;
          padding: 3px;
        `}
        ${leaf.tag &&
        css`
          font-family: monospace !important;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 3px;
        `}
      `}
    >
      {children}
    </span>
  );
};
