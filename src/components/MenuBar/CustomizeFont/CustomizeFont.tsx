import {
  fontFamilies,
  FontState,
  setFontFamily as setFontFamilyAction,
} from "@/redux/reducers/font";
import { closeModal } from "@/redux/reducers/modal";
import { RootState } from "@/redux/store";
import { Box, Button, Option, Select, Sheet, Typography } from "@mui/joy";
import Quote from "inspirational-quotes";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomizeFont() {
  const dispatch = useDispatch();
  const { family, size } = useSelector((store: RootState) => store.font);
  const [fontFamily, setFontFamily] = useState<FontState["family"]>(family);
  //   const [fontSize, setFontSize] = useState<FontState["size"]>(size);
  const quote = useMemo(() => Quote.getQuote(), []);

  console.log(family);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography>Preview</Typography>
        <Sheet
          sx={{
            borderRadius: "sm",
            p: 1,
            mb: 1,
            maxWidth: "24rem",
            maxHeight: "10rem",
            overflow: "scroll",
          }}
          variant="outlined"
        >
          <Typography
            sx={{
              //   fontSize: `${fontSize}px`,
              fontFamily: `${fontFamily}, sans-serif`,
            }}
          >{`${quote.text} - ${quote.author}`}</Typography>
        </Sheet>

        <Typography>Family</Typography>
        <Select
          sx={{ mb: 1 }}
          onChange={(e, value) => {
            setFontFamily(value as FontState["family"]);
          }}
          value={fontFamily}
          placeholder="Select a font family"
          slotProps={{
            listbox: {
              component: "div",
              sx: {
                maxHeight: 240,
                overflow: "auto",
                "--List-padding": "0px",
              },
            },
          }}
        >
          {fontFamilies.map(fontFamily => (
            <Option key={fontFamily} value={fontFamily}>
              {fontFamily}
            </Option>
          ))}
        </Select>

        {/* <Typography>Size</Typography> */}
        {/* <Select
          onChange={(e, value) => {
            setFontSize(value as FontState["size"]);
          }}
          value={fontSize}
          placeholder="Select a font size"
          slotProps={{
            listbox: {
              component: "div",
              sx: {
                maxHeight: 240,
                overflow: "auto",
                "--List-padding": "0px",
              },
            },
          }}
        >
          {fontSizes.map(size => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select> */}
      </Box>
      <Box
        sx={{
          bgcolor: "background.level1",
          px: 2,
          py: 1.5,
          m: "calc(-1 * var(--ModalDialog-padding))",
          mt: 0,
          borderBottomLeftRadius: "var(--ModalDialog-radius)",
          borderBottomRightRadius: "var(--ModalDialog-radius)",
          textAlign: "right",
        }}
      >
        <Button
          size="sm"
          variant="solid"
          color="neutral"
          sx={{ mr: 1 }}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => {
            dispatch(setFontFamilyAction(fontFamily));
            dispatch(closeModal());
          }}
        >
          Okay
        </Button>
      </Box>
    </>
  );
}
