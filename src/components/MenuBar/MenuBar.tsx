import { downloadFile, newFile } from "@/helpers/file";
import { serialize } from "@/helpers/slate";
import { openModal } from "@/redux/reducers/modal";
import { RootState } from "@/redux/store";
import {
  List,
  ListDivider,
  ListItem,
  Menu,
  MenuItem,
  Sheet,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { useMemo, useState } from "react";
import { FullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import { HistoryEditor } from "slate-history";
import { ReactEditor, useSlate } from "slate-react";
import CustomizeFont from "./CustomizeFont/CustomizeFont";
import MenuButton from "./MenuButton/MenuButton";

type MenuBarProps = {
  handleFullscreen?: FullScreenHandle;
};

export default function MenuBar({ handleFullscreen }: MenuBarProps) {
  const [activeMenuIndx, setActiveMenuIndx] = useState<number | null>(null);
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const { content: notepadContent, name: notepadName } = useSelector(
    (store: RootState) => store.notepad
  );
  const { family: fontFamily, size: fontSize } = useSelector(
    (store: RootState) => store.font
  );
  const editor = useSlate();

  const menuItems = useMemo(
    () => [
      {
        label: "File",
        items: [
          {
            label: "New File",
            shortcut: "Ctrl+N",
            onClick: () => newFile({}),
          },
          {
            label: "New Window",
            shortcut: "Ctrl+Shift+N",
            onClick: () => newFile({ newWindow: true }),
          },
          {
            label: "Open File",
            shortcut: "Ctrl+O",
            onClick: () => {
              document.getElementById("open-file")?.click();
            },
          },
          null,
          {
            label: "Save",
            shortcut: "Ctrl+S",
            onClick: () => {},
          },
          {
            label: "Auto Save",
            shortcut: null,
            onClick: () => {},
          },
          {
            label: "Download",
            shortcut: null,
            onClick: () => {
              if (!notepadContent) return;

              downloadFile(
                serialize(notepadContent),
                notepadName || "Untitled.txt",
                "text/plain"
              );
            },
          },
          null,
          {
            label: "Exit",
            shortcut: null,
            onClick: () => window.close(),
          },
        ],
      },
      {
        label: "Edit",
        items: [
          {
            label: "Undo",
            shortcut: "Ctrl+Z",
            onClick: () => {
              (editor as HistoryEditor).undo();
            },
          },
          {
            label: "Redo",
            shortcut: "Ctrl+Y",
            onClick: () => {
              (editor as HistoryEditor).redo();
            },
          },
          null,
          {
            label: "Cut",
            shortcut: "Ctrl+X",
            onClick: () => {
              ReactEditor.focus(editor as ReactEditor);

              document.execCommand("cut");
            },
          },
          {
            label: "Copy",
            shortcut: "Ctrl+C",
            onClick: () => {
              ReactEditor.focus(editor as ReactEditor);

              document.execCommand("copy");
            },
          },
          {
            label: "Paste",
            shortcut: "Ctrl+V",
            onClick: async () => {
              ReactEditor.focus(editor as ReactEditor);

              document.execCommand("paste");
            },
          },
          {
            label: "Delete",
            shortcut: "Del",
            onClick: () => {
              ReactEditor.focus(editor as ReactEditor);

              document.execCommand("delete");
            },
          },
          null,
          {
            label: "Find",
            shortcut: "Ctrl+F",
            onClick: () => {},
          },
          {
            label: "Find Next",
            shortcut: "F3",
            onClick: () => {},
          },
          {
            label: "Replace",
            shortcut: "Ctrl+H",
            onClick: () => {},
          },
          {
            label: "Go To",
            shortcut: "Ctrl+G",
            onClick: () => {},
          },
          null,
          {
            label: "Select All",
            shortcut: "Ctrl+A",
            onClick: () => {},
          },
          {
            label: "Time/Date",
            shortcut: "F5",
            onClick: () => {},
          },
        ],
      },
      {
        label: "Format",
        items: [
          {
            label: "Font",
            shortcut: null,
            onClick: () => {
              dispatch(
                openModal({
                  open: true,
                  title: "Font",
                  content: <CustomizeFont />,
                  footer: null,
                })
              );
            },
          },
        ],
      },
      {
        label: "View",
        items: [
          {
            label: "Zoom In",
            shortcut: "Ctrl+Plus",
            onClick: () => {},
          },
          {
            label: "Zoom Out",
            shortcut: "Ctrl+Minus",
            onClick: () => {},
          },
          {
            label: "Reset Zoom",
            shortcut: "Ctrl+0",
            onClick: () => {},
          },
          null,
          {
            label: "Toggle Full Screen",
            shortcut: "F11",
            onClick: () => {
              handleFullscreen?.active
                ? handleFullscreen.exit()
                : handleFullscreen?.enter();
            },
          },
          null,
          {
            label: "Toggle Title Bar",
            shortcut: null,
            onClick: () => {},
          },
          null,
          {
            label: "Toggle Theme",
            shortcut: null,
            onClick: () => setMode(mode === "dark" ? "light" : "dark"),
          },
        ],
      },
      {
        label: "About",
        items: [
          {
            label: "About Us",
            shortcut: null,
            onClick: () => {},
          },
          {
            label: "Send Feedback",
            shortcut: null,
            onClick: () => {},
          },
          {
            label: "Report a Problem",
            shortcut: null,
            onClick: () => {},
          },
        ],
      },
    ],
    [editor, handleFullscreen, mode, notepadContent, notepadName, setMode]
  );

  return (
    <Sheet sx={{ height: "2.5rem" }}>
      <List size="sm" orientation="horizontal">
        <ListItem>
          {menuItems.map(({ items, label }, menuIndx) => (
            <MenuButton
              key={menuIndx}
              onOpen={() => setActiveMenuIndx(menuIndx)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === menuIndx}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu
                  container={
                    typeof document !== "undefined"
                      ? document.querySelector(".fullscreen")
                      : undefined
                  }
                  size="sm"
                  sx={{ minWidth: "11rem" }}
                >
                  {items.map((item, itemIndx) =>
                    item ? (
                      <MenuItem key={itemIndx} onClick={item.onClick}>
                        {item.label}{" "}
                        {item.shortcut && (
                          <Typography
                            fontSize=".6rem"
                            sx={{ marginLeft: "auto" }}
                            variant="outlined"
                            color="info"
                          >
                            {item.shortcut}
                          </Typography>
                        )}
                      </MenuItem>
                    ) : (
                      <ListDivider key={itemIndx} />
                    )
                  )}
                </Menu>
              }
            >
              {label}
            </MenuButton>
          ))}
        </ListItem>
      </List>
    </Sheet>
  );
}
