import {
  FontState,
  FONT_STORE_KEY,
  setFont as setFontState,
} from "@/redux/reducers/font";
import {
  NotepadState,
  NOTEPAD_STATE_STORE_KEY,
  setNotepad as setNotepadState,
} from "@/redux/reducers/notepad";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";

export default function LocalStorage() {
  const [notepadLocalStorage, setNotepadLocalStorage] = useLocalStorage<
    NotepadState | undefined
  >(NOTEPAD_STATE_STORE_KEY, undefined);
  const [fontLocalStorage, setFontLocalStorage] = useLocalStorage<
    FontState | undefined
  >(FONT_STORE_KEY, undefined);

  const {
    content: notepadContent,
    name: notepadName,
    id: notepadId,
  } = useSelector((store: RootState) => store.notepad);
  const { family: fontFamily, size: fontSize } = useSelector(
    (store: RootState) => store.font
  );

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
    setFontLocalStorage({
      family: fontFamily,
      size: fontSize,
    });
  }, [fontFamily, fontSize, setFontLocalStorage]);

  useEffect(() => {
    if (fontLocalStorage) dispatch(setFontState(fontLocalStorage));

    if (notepadLocalStorage) dispatch(setNotepadState(notepadLocalStorage));
  }, []);

  return <></>;
}
