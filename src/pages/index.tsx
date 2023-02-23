import ClientOnly from "@/components/ClientOnly/ClientOnly";
import CustomTextarea from "@/components/CustomTextarea/CustomTextarea";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import LocalStorage from "@/components/LocalStorage/LocalStorage";
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
import useLocalStorage from "use-local-storage";

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
    open: alertOpen,
    content: alertContent,
    title: alertTitle,
    footer: alertFooter,
    onClose: alertOnClose,
  } = useSelector((store: RootState) => store.modal);
  const { content: notepadContent } = useSelector(
    (store: RootState) => store.notepad
  );
  const dispatch = useDispatch();
  const [fullscreenAlertShowed, setFullscreenAlertShowed] = useLocalStorage(
    "fullscreen-alert-showed",
    0
  );

  useEffect(() => {
    // below code is for showing fullscreen alert
    if (fullscreenAlertShowed <= 1)
      dispatch(
        openModal({
          open: true,
          title: "Full Screen",
          onClose: () => {
            setFullscreenAlertShowed(fullscreenAlertShowed + 1);
          },
          content: (
            <Typography>
              We recommend using full screen mode for the best experience.
              Because of the way the editor is designed, it works best with the
              full screen. You can still use the app in a smaller window, but
              some features may not work as expected. We&apos;ve found some UI
              alignment and override issues when not in full screen mode on
              mobile devices.
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
    // above code is for showing fullscreen alert
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
          open={alertOpen}
          onClose={() => {
            alertOnClose && alertOnClose();
            dispatch(closeModal());
          }}
        >
          <ModalDialog>
            <ModalClose />
            <Typography fontSize="lg">{alertTitle}</Typography>
            <Divider
              sx={{
                mt: 2,
              }}
              inset="none"
            />
            <Box
              sx={{
                py: 2,
                pb: alertFooter ? 2 : 0,
              }}
            >
              {alertContent}
            </Box>
            {alertFooter && (
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
                {alertFooter}
              </Box>
            )}
          </ModalDialog>
        </Modal>

        <FullScreen handle={handleFullscreen}>
          <LocalStorage />
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
              <MenuBar handleFullscreen={handleFullscreen} />
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
