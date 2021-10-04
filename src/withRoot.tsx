import { CssBaseline, adaptV4Theme } from "@mui/material";
import { createTheme, Theme, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      light: "#e5e5e5",
      main: "#727272",
      dark: "#363839",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5e50",
      main: "#e41e26",
      dark: "#a90000",
      contrastText: "#fff"
    }
  }
}));

export function withRoot(Component: any): React.FC {
  const WithRoot: React.FC = (props: object) => {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  return WithRoot;
}
