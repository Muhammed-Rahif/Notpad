import { Sheet, Typography } from "@mui/joy";

export default function FooterBar() {
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "1.3rem",
        position: "sticky",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography fontSize=".8rem" sx={{ paddingX: 1 }}>
        Ln 1, Col 1
      </Typography>
    </Sheet>
  );
}
