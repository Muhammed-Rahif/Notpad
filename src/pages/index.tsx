import ClientOnly from "@/components/ClientOnly/ClientOnly";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import TitleBar from "@/components/TitleBar/TitleBar";
import {
  Box,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Typography,
  useColorScheme,
} from "@mui/joy";

const CustomDivider = () => {
  const { mode } = useColorScheme();
  return (
    <ClientOnly>
      <Divider sx={{ bgcolor: mode === "light" ? "divider" : "#25252D" }} />
    </ClientOnly>
  );
};

export default function Home() {
  return (
    <>
      <AppHead />

      <Modal open>
        <ModalDialog>
          <ModalClose />
          <Typography>Modal title</Typography>
        </ModalDialog>
      </Modal>

      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <TitleBar />
          <CustomDivider />
          <MenuBar />
          <CustomDivider />
        </Box>
        <Textarea
          size="lg"
          variant="soft"
          color="neutral"
          maxRows={10}
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
          }}
        />
        <CustomDivider />
        <FooterBar />
      </Box>
    </>
  );
}
