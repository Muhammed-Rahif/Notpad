import {
  Avatar,
  Box,
  Divider,
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
} from "@mui/joy";
import Image from "next/image";
import { useMemo, useState } from "react";
import MenuButton from "./MenuButton/MenuButton";

type MenuBarProps = {};

export default function MenuBar({}: MenuBarProps) {
  const [activeMenuIndx, setActiveMenuIndx] = useState<number | null>(null);

  const menuItems = useMemo(
    () => [
      {
        label: "File",
        items: [
          {
            label: "New File",
            shortcut: "Ctrl+N",
            onClick: () => {},
          },
          {
            label: "New Window",
            shortcut: "Ctrl+Shift+N",
            onClick: () => {},
          },
          {
            label: "Open File",
            shortcut: "Ctrl+O",
            onClick: () => {},
          },
          {
            label: "Save File",
            shortcut: "Ctrl+S",
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
            label: "Toggle Status Bar",
            shortcut: null,
            onClick: () => {},
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
    []
  );

  return (
    <>
      <Sheet>
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
                  <Menu size="sm" sx={{ minWidth: "11rem" }}>
                    {items.map((item, itemIndx) =>
                      item ? (
                        <MenuItem key={itemIndx}>
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
            {/* 
            <MenuButton
              onOpen={() => setActiveMenuIndx(0)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === 0}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu size="sm" sx={{ minWidth: "11rem" }}>
                  <MenuItem>
                    New File{" "}
                    <Typography
                      fontSize=".6rem"
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      color="info"
                    >
                      Ctrl+N
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    New Window
                    <Typography
                      fontSize=".6rem"
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      color="info"
                    >
                      Ctrl+Shift+N
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    Open File
                    <Typography
                      fontSize=".6rem"
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      color="info"
                    >
                      Ctrl+O
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    Save File
                    <Typography
                      fontSize=".6rem"
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      color="info"
                    >
                      Ctrl+S
                    </Typography>
                  </MenuItem>
                  <ListDivider />
                  <MenuItem>Exit</MenuItem>
                </Menu>
              }
            >
              File
            </MenuButton>
          </ListItem>

          <ListItem>
            <MenuButton
              onOpen={() => setActiveMenuIndx(1)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === 1}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu size="sm" sx={{ minWidth: "11rem" }}>
                  <MenuItem>Undo</MenuItem>
                  <ListDivider />
                  <MenuItem>Cut</MenuItem>
                  <MenuItem>Copy</MenuItem>
                  <MenuItem>Paste</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <ListDivider />
                  <MenuItem>Find</MenuItem>
                  <MenuItem>Go To</MenuItem>
                  <ListDivider />
                  <MenuItem>Select All</MenuItem>
                  <MenuItem>Time/Date</MenuItem>
                  <ListDivider />
                  <MenuItem>Font</MenuItem>
                </Menu>
              }
            >
              Edit
            </MenuButton>
          </ListItem>

          <ListItem>
            <MenuButton
              onOpen={() => setActiveMenuIndx(2)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === 2}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu size="sm">
                  <MenuItem>Fullscreen</MenuItem>
                  <MenuItem>Dark Mode</MenuItem>
                </Menu>
              }
            >
              View
            </MenuButton>
          </ListItem>

          <ListItem>
            <MenuButton
              onOpen={() => setActiveMenuIndx(3)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === 3}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu size="sm">
                  <MenuItem>Help</MenuItem>
                  <MenuItem>Send Feedback</MenuItem>
                  <MenuItem>Report a Problem</MenuItem>
                </Menu>
              }
            >
              Help
            </MenuButton> */}
          </ListItem>
        </List>
      </Sheet>

      <Divider />
    </>
  );
}
