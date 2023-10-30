import React from "react";
import { Route } from "react-router-dom";
import CustomBrowserRouter from "../containers/custom-browser-router";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import Patients from "./Patients";
import Parmacies from "./Parmacies";
import AddMedicine from "./AddMedicine";
import Precpitions from "./Precpitions";

import { createTheme, ThemeProvider } from "@mui/material/styles";

let theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      light: "#63ccff",
      main: "#1A6776",
      dark: "#006db3",
    },
  },
  typography: {
    fontFamily: `"Tajawal",sans-serif`,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#1A6776",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

export default function () {
  return (
    <CustomBrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <PlatformContainer> */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route exact path="/doctors">
            <Doctors />
          </Route>
          <Route exact path="/pharmacy">
           <Parmacies />
          </Route>
          <Route exact path="/patients">
           <Patients />
          </Route>
          <Route exact path="/addmedicine">
           <AddMedicine />
          </Route>
          <Route exact path="/precpitions">
           <Precpitions />
          </Route>
        {/* </PlatformContainer> */}
      </ThemeProvider>
    </CustomBrowserRouter>
  );
}
