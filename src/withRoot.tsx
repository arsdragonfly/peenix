import { CssBaseline } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme();

export function withRoot(Component: any): React.FC {
  const WithRoot: React.FC = (props: object) => {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
        <ThemeProvider theme={theme}>
          {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
    );
  }
  return WithRoot;
}
