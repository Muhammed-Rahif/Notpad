function newFile({ newWindow = false }) {
  window.open(
    window.location.href,
    "_blank",
    newWindow ? "location=yes,height=570,width=520,scrollbars=yes,status=yes" : undefined
  );
}

export { newFile };
