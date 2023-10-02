import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#48b53f',
      dark: '#36792f',
    },
    secondary: {
      main: '#1b536f',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#00a821',
    },
  },
  typography: {
    fontFamily: 'Oswald, Open Sans',
    fontSize: 20,
    htmlFontSize: 21,
    h1: {
      lineHeight: 1.03,
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '2.4rem',
    },
    h3: {
      fontSize: '2.2rem',
    },
    h4: {
      fontSize: '2rem',
    },
  },
  components: {
    // Name of the component
    MuiPopover: {
      styleOverrides: {
        // Name of the slot
        paper: {
          // Some CSS
          backgroundColor: 'none !important',
        },
        root: {
          // Some CSS
          backgroundColor: 'none !important',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'transparent',
          fontSize: '1em',
          color: '#00a821',
          padding: '0px',
          margin: '0px',
        },
        // popper: {
        //   marginTop: '-300px',
        // },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
