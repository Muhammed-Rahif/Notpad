import { newFile } from "@/helpers/file";
import { closeModal, openModal } from "@/redux/reducers/modal";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuItem,
  Sheet,
  Typography,
  useColorScheme,
} from "@mui/joy";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import MenuButton from "./MenuButton/MenuButton";

type MenuBarProps = {};

export default function MenuBar({}: MenuBarProps) {
  const [activeMenuIndx, setActiveMenuIndx] = useState<number | null>(null);
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();

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
            label: "Save in Browser",
            shortcut: null,
            onClick: () => {},
          },
          null,
          {
            label: "Exit",
            shortcut: null,
            onClick: () => {},
          },
        ],
      },
      {
        label: "Edit",
        items: [
          {
            label: "Undo",
            shortcut: "Ctrl+Z",
            onClick: () => {},
          },
          {
            label: "Redo",
            shortcut: "Ctrl+Y",
            onClick: () => {},
          },
          null,
          {
            label: "Cut",
            shortcut: "Ctrl+X",
            onClick: () => {},
          },
          {
            label: "Copy",
            shortcut: "Ctrl+C",
            onClick: () => {},
          },
          {
            label: "Paste",
            shortcut: "Ctrl+V",
            onClick: () => {},
          },
          {
            label: "Delete",
            shortcut: "Del",
            onClick: () => {},
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
            onClick: () => {},
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
    [mode, setMode]
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
