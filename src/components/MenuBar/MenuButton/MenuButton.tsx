import { Button, ListItemButton, Menu } from "@mui/joy";
import React, { ReactElement, ReactNode, useState } from "react";

type MenuButtonProps = { menu: ReactElement; children: ReactNode };

export default function MenuButton({ menu, children }: MenuButtonProps) {
  const [open, setOpen] = useState(false);
  const [anchorElem, setAnchorElem] = useState<EventTarget | null>(null);

  return (
    <>
      <ListItemButton
        sx={{ textAlign: "start" }}
        onClick={e => setAnchorElem(e.target)}
      >
        {children}
      </ListItemButton>

      {React.cloneElement(menu, {
        open: Boolean(anchorElem),
        onClose: () => setAnchorElem(null),
        anchorEl: anchorElem,
        placement: "bottom-start",
      })}
    </>
  );
}
