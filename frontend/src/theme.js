// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    palette: {
        primary: {
          main: '#5ACCCC',
          dark: 'steelblue',
        },
        secondary: {
          light: '#ff7961',
          main: '#28B8B8',
          dark: '#ba000d',
        },
      },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      borderRadius: '50px',
      fontWeight: 800,
    //    backgroundColor: '#28B8B8'
    },
    h2: {
      margin: '16px 0px 0px',
      fontFamily: 'Mulish, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      lineHeight: 1.5,
      color: 'rgb(51, 92, 110)',
      fontSize: '1.625rem',
      fontWeight: 800,
      textAlign: 'center',
    },
    h3: {
        margin: '16px 0px 0px',
        fontFamily: 'Mulish, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        color: 'rgb(51, 92, 110)',
        fontWeight: 800,
        textAlign: 'center',
      },
  },
});

export default theme;
