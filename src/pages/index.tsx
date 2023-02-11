import ClientOnly from "@/components/ClientOnly/ClientOnly";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import TitleBar from "@/components/TitleBar/TitleBar";
import { closeModal, openModal } from "@/redux/reducers/modelReducer";
import { RootState } from "@/redux/store";
import { useEffect, cloneElement } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

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
  const handleFullscreen = useFullScreenHandle();
  const { open, content, title, footer } = useSelector(
    (store: RootState) => store.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      openModal({
        open: true,
        title: "Full Screen",
        content: (
          <Typography>
            We recommend using full screen mode for the best experience. Because
            of the way the editor is designed, it works best with the full
            screen. You can still use the app in a smaller window, but some
            features may not work as expected. We&apos;ve found some UI
            alignment and override issues when not in full screen mode on mobile
            devices.
          </Typography>
        ),
        footer: (
          <Button size="sm" onClick={handleFullscreen.enter}>
            Okay
          </Button>
        ),
      })
    );
  }, []);

  return (
    <>
      <AppHead />

      <Modal open={open} onClose={() => dispatch(closeModal())}>
        <ModalDialog>
          <ModalClose />
          <Typography fontSize="lg">{title}</Typography>
          <Divider
            sx={{
              mt: 2,
            }}
            inset="none"
          />
          <Box
            sx={{
              py: 2,
            }}
          >
            {content}
          </Box>
          <Box
            sx={{
              bgcolor: "background.level1",
              px: 2,
              py: 1.5,
              m: "calc(-1 * var(--ModalDialog-padding))",
              mt: 0,
              borderBottomLeftRadius: "var(--ModalDialog-radius)",
              borderBottomRightRadius: "var(--ModalDialog-radius)",
              textAlign: "right",
            }}
          >
            {footer}
          </Box>
        </ModalDialog>
      </Modal>

      <FullScreen handle={handleFullscreen}>
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
      </FullScreen>
    </>
  );
}
