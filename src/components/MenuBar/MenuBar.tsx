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
import MenuButton from "./MenuButton/MenuButton";

type MenuBarProps = {};

export default function MenuBar({}: MenuBarProps) {
  return (
    <>
      <Sheet>
        <List size="sm" orientation="horizontal">
          <ListItem>
            <MenuButton
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
