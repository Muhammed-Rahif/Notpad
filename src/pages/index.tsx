import ClientOnly from "@/components/ClientOnly/ClientOnly";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import TitleBar from "@/components/TitleBar/TitleBar";
import { Divider, Textarea, useColorScheme } from "@mui/joy";

const CustomDivider = () => {
  const { mode } = useColorScheme();
  return (
    <ClientOnly>
      <Divider
        sx={{
          bgcolor: mode === "light" ? "divider" : "#25252D",
        }}
      />
    </ClientOnly>
  );
};

export default function Home() {
  return (
    <>
      <AppHead />

      <TitleBar />
      <CustomDivider />
      <MenuBar />
      <CustomDivider />
      <Textarea
        size="lg"
        variant="soft"
        color="neutral"
        maxRows={10}
        sx={{
          borderRadius: 0,
          height: "calc(100vh - 7rem)",
          maxHeight: "calc(100vh - 7rem)",
          shadow: "none",
          border: "0px solid transparent",
          "--Textarea-focusedHighlight": "rgba(0,0,0,0)",
          resize: "none",
          paddingY: 0,
        }}
      />
      <CustomDivider />
      <FooterBar />
    </>
  );
}
