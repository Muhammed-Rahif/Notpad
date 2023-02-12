export function newFile({
  newWindow = false,
}: {
  newWindow?: boolean;
  content?: string;
}): void {
  newWindow
    ? window.open(
        "/",
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      )
    : window.open("/", "_blank");
}
