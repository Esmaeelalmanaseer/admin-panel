import * as React from "react";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useHistory,useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { db } from "../containers/firebase";
import styled from "@emotion/styled";
import axios from "axios";
import {RouterContext} from "../containers/custom-browser-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import Navigator from "./theme/Navigator";
import Header from "./theme/Header";

let theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
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
const drawerWidth = 256;

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    left: 0,
    textAlign: "left",
    paddingRight: "30px",
  },
  "& .MuiInputLabel-shrink": {
    margin: "0 auto",
    position: "absolute",
    right: "0",
    left: "0",
    top: "-3px",
    width: "150px", // Need to give it a width so the positioning will work
    background: "white", // Add a white bg
    // display: "none" //if you want to hide it completly
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& legend ": {
      display: "none", // If you want it then you need to position it similar with above
    },
  },
});
export default function AddMedicine(): React.ReactElement {
  const history = useHistory();
  const location = useLocation();
  const { state }: { state: any } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const { currentUser, handleAuthChange } = React.useContext(RouterContext);
  const [title, setTitle] = React.useState<string>("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const medicineCollecationRef = collection(db, "/medicine/");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  

  const save = async () => {
    if (
      title != null 
    ) {
        await addDoc(medicineCollecationRef,{
            name: title,
          });
       
      history.push("/home/");
    }

  };


  React.useEffect(() => {
    handleAuthChange({
      err: () => {
        history.push("/teacher/login");
      },
    });
  }, []);

  React.useEffect(() => {
  }, [currentUser]);

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column",height:"100vh" }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            title={"Add New Medicine"}
          />
          <Box
            component="main"
            flex={1} overflow="auto"
            sx={{
              flex: 1,
              py: 6,
              overflow:"auto",
              px: 4,
              bgcolor: "#eaeff1",
            }}
          >
            {loader ? (
              <>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loader}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </>
            ) : (
              <>
<Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button   onClick={async () => {
                        setLoader(true);
                        handleClose();
                        await save();
                        setLoader(false);
                      }}>Add</Button>
        </DialogActions>
      </Dialog>

                <form
                  style={{ height: "auto" }}
                  onSubmit={(e: React.ChangeEvent<any>) => {
                    e.preventDefault();
                    handleClickOpen();
                  }}
                >
                  <Card>
                    <CardHeader
                      subheader= 'Admin'
                      title="New Medicine"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <StyledTextField
                            fullWidth
                        
                            label="Medicine Name"
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right" },
                              },
                            }}
                            name="title"
                            onChange={({ target }: { target: any }) =>
                              setTitle(target.value)
                            }
                            required
                            variant="outlined"
                          />
                        </Grid>
                       
                      
                        
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Button color="primary" type="submit" variant="contained">
                     Add Medicine
                      </Button>
                    </Box>
                  </Card>
                </form>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
