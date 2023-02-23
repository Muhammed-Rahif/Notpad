import { Sheet, Typography } from "@mui/joy";
import { useSlateSelector } from "slate-react";

export default function FooterBar() {
  const selection = useSlateSelector(editor => editor.selection);

  const lineNo = selection?.focus.path[0];
  const colNo = selection?.focus.offset;

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "1.3rem",
        position: "sticky",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography fontSize=".8rem" sx={{ paddingX: 1 }}>
        Ln {typeof lineNo === "number" ? lineNo + 1 : 0}, Col{" "}
        {typeof colNo === "number" ? colNo + 1 : 0}
      </Typography>
    </Sheet>
  );
}
