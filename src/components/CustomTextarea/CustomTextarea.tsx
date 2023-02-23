import {
  NotepadState,
  NOTEPAD_STATE_STORE_KEY,
} from "@/redux/reducers/notepad";
import { RootState } from "@/redux/store";
import { css } from "@emotion/css";
import { Box } from "@mui/joy";
import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor, Node, NodeEntry, Text, Transforms } from "slate";
import { Editable, RenderLeafProps, useSlate } from "slate-react";
import useLocalStorage from "use-local-storage";

export default function CustomTextarea() {
  const [notepadLocalStorage] = useLocalStorage<NotepadState | undefined>(
    NOTEPAD_STATE_STORE_KEY,
    undefined
  );
  const dispatch = useDispatch();
  const editor = useSlate();
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const { family: fontFamily, size: fontSize } = useSelector(
    (store: RootState) => store.font
  );

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
          bgcolor: "neutral.softBg",
          color: "neutral.softColor",
          overflowY: "scroll",
          fontFamily: `${fontFamily}, sans-serif`,
        }}
        renderLeaf={renderLeaf}
        decorate={decorate}
      />
    </>
  );
}

const Leaf = ({
  attributes,
  children,
  leaf,
}: RenderLeafProps & { leaf: any }) => {
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
          margin: 6px 0 3px 0;
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
          background-color: rgba(0, 0, 0, 0.5);
          padding: 6px;
          border-radius: 5px;
          display: inline-block;
          min-width: 288px;
        `}
        ${leaf.tag &&
        css`
          background-color: rgba(0, 0, 0, 0.5);
          padding: 3px;
          border-radius: 5px;
          display: inline-block;
        `}
      `}
    >
      {children}
    </span>
  );
};
