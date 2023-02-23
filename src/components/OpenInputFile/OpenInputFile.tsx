import { updateNotepad } from "@/redux/reducers/notepad";
import { Box } from "@mui/joy";
import { useDispatch } from "react-redux";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

export default function OpenInputFile() {
  const editor = useSlate();
  const dispatch = useDispatch();

  return (
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

          dispatch(
            updateNotepad({
              name: file.name,
            })
          );
        };
        reader.readAsText(file);
      }}
      name="open-file"
      id="open-file"
      hidden
      accept=".txt,.js,.html,.ts,.json,.md,.css,.scss,.sass,.less,.yml,.yaml,.xml,.jsx,.tsx,.mdx,.mdxjs,.mdown,.markdown,.markdn,.mkdn,.mkd,.mdwn,.mdtxt,.mdtext,.text,.rmd,.org,.rst,.adoc,.asciidoc,.ad,.asc,.creole,.mediawiki,.wiki,.rest,.pod,.pandoc,.ipynb,.tex,.latex,.ltx,.bib,.cls,.sty,.dtx,.ins,.lco,.dtx,.cfg,.ini,.conf,.properties,.prop,.toml,.tmlanguage"
    />
  );
}
