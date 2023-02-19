import ClientOnly from "@/components/ClientOnly/ClientOnly";
import CustomTextarea from "@/components/CustomTextarea/CustomTextarea";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import OpenInputFile from "@/components/OpenInputFile/OpenInputFile";
import TitleBar from "@/components/TitleBar/TitleBar";
import { closeModal, openModal } from "@/redux/reducers/modal";
import { updateNotepad } from "@/redux/reducers/notepad";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { useEffect, useMemo } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, withReact } from "slate-react";

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
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const handleFullscreen = useFullScreenHandle();
  const {
    open,
    content: alertContent,
    title,
    footer,
  } = useSelector((store: RootState) => store.modal);
  const {
    content: notepadContent,
    name: notepadName,
    id: notepadId,
  } = useSelector((store: RootState) => store.notepad);
  const dispatch = useDispatch();

  //  ==== after render useEffect ====
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
          <Button
            size="sm"
            onClick={() => {
              handleFullscreen.enter();
              dispatch(closeModal());
            }}
          >
            Okay
          </Button>
        ),
      })
    );
  }, []);

  return (
    <>
      <AppHead />

      <Slate
        editor={editor}
        value={notepadContent}
        onChange={value => {
          dispatch(updateNotepad({ content: value }));
        }}
      >
        <Modal
          container={
            typeof document !== "undefined"
              ? document.querySelector(".fullscreen")
              : undefined
          }
          open={open}
          onClose={() => dispatch(closeModal())}
        >
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
              {alertContent}
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
            <CustomTextarea />
            <OpenInputFile />
            <CustomDivider />
            <FooterBar />
          </Box>
        </FullScreen>
      </Slate>
    </>
  );
}
