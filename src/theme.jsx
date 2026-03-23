import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a3d35', // Forest Green
    },
    background: {
      default: '#f7fff7', // Mint Background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h6: { fontWeight: 600 },
  },
});

export default theme;   