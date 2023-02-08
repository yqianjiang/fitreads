// A top-level React component that wraps all the pages
// Can load global CSS, & keep global states
// https://nextjs.org/docs/advanced-features/custom-app
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../redux/store";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function App({ Component, pageProps }) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: '#fba332',
          },
          secondary: {
            main: '#3289fb',
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );
}
