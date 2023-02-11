import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import TitleBar from "@/components/TitleBar/TitleBar";
import { Textarea } from "@mui/joy";

export default function Home() {
  return (
    <>
      <AppHead />

      <TitleBar />
      <MenuBar />
      <Textarea
        size="lg"
        variant="soft"
        color="neutral"
        sx={{
          borderRadius: 0,
          height: "100%",
          shadow: "none",
          border: "0px solid transparent",
          "--Textarea-focusedHighlight": "rgba(0,0,0,0)",
        }}
      />
    </>
  );
}
