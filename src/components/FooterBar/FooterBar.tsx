import {
  Divider,
  List,
  Sheet,
  Textarea,
  Typography,
  useColorScheme,
} from "@mui/joy";

export default function FooterBar() {
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography fontSize=".9rem" sx={{ paddingX: 1 }}>
        Ln 1, Col 1
      </Typography>
    </Sheet>
  );
}
