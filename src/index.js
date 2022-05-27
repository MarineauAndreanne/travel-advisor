import React from "react"
import { createRoot } from "react-dom/client"
import { createTheme, ThemeProvider } from "@material-ui/core"

import App from "./App"

const theme = createTheme({
  palette: {
    primary: {
      main: "#fac9a9",
    },
    secondary: {
      main: "#ffcc80", //Another orange-ish color
    },
  },
})

const root = createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
