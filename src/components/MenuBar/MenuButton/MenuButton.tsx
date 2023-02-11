import { Button, ListItemButton, Menu } from "@mui/joy";
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type MenuButtonProps = {
  menu: ReactElement;
  children: ReactNode;
  open?: boolean;
  onHoverOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function MenuButton({
  menu,
  children,
  onOpen,
  onClose,
  onHoverOpen,
  open,
}: MenuButtonProps) {
  const btnRef = useRef();

  return (
    <>
      <ListItemButton
        component={ListItemButton}
        ref={btnRef as any}
        sx={{
          textAlign: "start",
          borderRadius: 4,
          margin: 0.01,
          minWidth: "3.5rem",
        }}
        onClick={onOpen}
        onMouseEnter={() => onOpen && onHoverOpen && onOpen()}
      >
        {children}
      </ListItemButton>

      {React.cloneElement(menu, {
        open: Boolean(open),
        onClose: onClose,
        anchorEl: btnRef.current,
        placement: "bottom-start",
      })}
    </>
  );
}
