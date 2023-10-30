import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: `"Tajawal",sans-serif`,
  },
  overrides: {
    MuiRadio: {
      root: {
        padding: '4px'
      }
    },
    MuiSvgIcon: {
      root: {
        width: '1rem',
        height: '1rem',
      }
    },
    MuiFormControl: {
      root: {
        margin: '0.3rem 0',
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #EAEAEA',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #EAEAEA`,
        },
        '&$focused': {
          '&:after': {
            borderBottom: '2px solid #138356',
          }
        },
      }
    }
  }
});


export default function ({children}: any) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
