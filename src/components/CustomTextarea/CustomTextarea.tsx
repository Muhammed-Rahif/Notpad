import ClientOnly from "@/components/ClientOnly/ClientOnly";
import FooterBar from "@/components/FooterBar/FooterBar";
import AppHead from "@/components/Head/Head";
import MenuBar from "@/components/MenuBar/MenuBar";
import TitleBar from "@/components/TitleBar/TitleBar";
import { closeModal, openModal } from "@/redux/reducers/modal";
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
import {
  NotepadState,
  setNotepad,
  updateNotepad,
} from "@/redux/reducers/notepad";
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

export default function CustomTextarea() {
  const [notepadLocalStorage, setNotepadLocalStorage] = useLocalStorage<
    NotepadState | undefined
  >("notepad-state", undefined);
  const {
    present: { content: notepadContent, name: notepadName, id: notepadId },
  } = useSelector((store: RootState) => store.notepad);
  const dispatch = useDispatch();

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
    if (notepadLocalStorage) dispatch(setNotepad(notepadLocalStorage));
  }, []);

  return (
    <>
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
          fontFamily: "monospace !important",
        }}
        value={notepadContent}
        defaultValue={notepadLocalStorage?.content}
        onChange={e => {
          dispatch(updateNotepad({ content: e.target.value }));
        }}
      >
        <Box sx={{ height: "100px" }} />
      </Textarea>
    </>
  );
}
