import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  ListDivider,
  ListItem,
  Menu,
  MenuItem,
  Sheet,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal, openModal } from "@/redux/reducers/modal";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { updateNotepad } from "@/redux/reducers/notepad";

type TitleBarProps = {
  title?: string;
};

export default function TitleBar({ title = "Untitled" }: TitleBarProps) {
  const [profileOpen, setProfileOpen] = useState<EventTarget | null>(null);
  const dispatch = useDispatch();
  const {
    present: { content: notepadContent, name: notepadName, id: notepadId },
  } = useSelector((store: RootState) => store.notepad);

  useEffect(() => {
    if (!notepadName) dispatch(updateNotepad({ name: title }));
  }, []);

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "3rem",
      }}
    >
      <Typography padding={1} display="flex" alignItems="center">
        <Image
          style={{ marginRight: ".5rem" }}
          src="/assets/images/logo.png"
          alt={""}
          width={24}
          height={24}
        />
        <Box
          sx={{ marginRight: "1.5rem" }}
          component="span"
          className="notepad-logo-font"
          fontSize="1.25rem"
        >
          Notepad
        </Box>
      </Typography>

      <Input
        variant="plain"
        color="neutral"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          ":focus-visible": {
            outline:
              "solid 1px rgba(var(--joy-palette-neutral-mainChannel) / .75)",
          },
          textAlign: "center",
          maxWidth: "8rem",
        }}
        slotProps={{
          input: {
            style: {
              textAlign: "center",
            },
          },
        }}
        size="sm"
        value={notepadName}
        required
        onChange={e => {
          if (!e.target.value) return;
          dispatch(
            updateNotepad({
              name: e.target.value,
            })
          );
        }}
      />

      <Box sx={{ marginY: 0.5, marginX: 1 }}>
        {true ? (
          <IconButton
            color="neutral"
            sx={{
              marginInlineStart: "var(--Avatar-marginInlineStart)",
              boxShadow: "var(--Avatar-ring)",
            }}
            onClick={e =>
              Boolean(profileOpen)
                ? setProfileOpen(null)
                : setProfileOpen(e.target)
            }
          >
            MR
          </IconButton>
        ) : (
          <Button
            color="neutral"
            variant="soft"
            sx={{
              ":hover": {
                bgcolor: "rgba(var(--joy-palette-neutral-mainChannel) / 0.28)",
              },
            }}
            size="sm"
          >
            Login
          </Button>
        )}
      </Box>

      <Menu
        container={
          typeof document !== "undefined"
            ? document.querySelector(".fullscreen")
            : undefined
        }
        anchorEl={profileOpen as any}
        open={Boolean(profileOpen)}
        onClose={() => setProfileOpen(null)}
        aria-labelledby="profile"
        placement="bottom-end"
        sx={{ p: 2, minWidth: "16rem" }}
      >
        <Typography fontWeight="600" fontSize="xl">
          John Due
        </Typography>
        <Typography fontSize="sm" fontStyle="italic">
          johndue@email.com
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{ mb: 0.75 }} fontSize="sm">
          Notepads:-
        </Typography>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 8,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          My Works
          <Box>
            <IconButton sx={{ mx: 0.4 }} size="sm" variant="plain">
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ mx: 0.4 }}
              color="danger"
              size="sm"
              variant="plain"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Sheet>

        <Divider sx={{ my: 2 }} />

        <Button
          onClick={() => {
            dispatch(
              openModal({
                title: "Confirmation",
                content: (
                  <Typography textColor="text.tertiary">
                    Are you sure you want to logout?
                  </Typography>
                ),
                open: true,
                footer: (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "flex-end",
                      pt: 2,
                    }}
                  >
                    <Button
                      onClick={() => dispatch(closeModal())}
                      variant="plain"
                      color="neutral"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => dispatch(closeModal())}
                      variant="solid"
                      color="danger"
                    >
                      Logout
                    </Button>
                  </Box>
                ),
              })
            );
          }}
          color="danger"
          size="sm"
        >
          Logout
        </Button>
      </Menu>
    </Sheet>
  );
}
