// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f00', // Orange
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7b1fa2', // Purple
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      gradient: 'linear-gradient(135deg, #ff6f00 0%, #7b1fa2 100%)',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
