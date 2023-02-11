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
import { useState } from "react";
import MenuButton from "./MenuButton/MenuButton";

type MenuBarProps = {};

export default function MenuBar({}: MenuBarProps) {
  const [activeMenuIndx, setActiveMenuIndx] = useState<number | null>(null);

  return (
    <>
      <Sheet>
        <List size="sm" orientation="horizontal">
          <ListItem>
            <MenuButton
              onOpen={() => setActiveMenuIndx(0)}
              onClose={() => setActiveMenuIndx(null)}
              open={activeMenuIndx === 0}
              onHoverOpen={typeof activeMenuIndx === "number"}
              menu={
                <Menu size="sm">
                  <MenuItem>New File</MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem>Open File</MenuItem>
                  <MenuItem>Save File</MenuItem>
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
                <Menu size="sm">
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
            </MenuButton>
          </ListItem>
        </List>
      </Sheet>

      <Divider />
    </>
  );
}
