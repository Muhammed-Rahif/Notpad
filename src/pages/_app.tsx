import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CssVarsProvider defaultMode="light">
        <Component {...pageProps} />
      </CssVarsProvider>
    </Provider>
  );
}
