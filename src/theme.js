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
  },
};

const theme = createTheme(themeOptions);

export default theme;
