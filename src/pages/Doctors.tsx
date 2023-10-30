import * as React from "react";
import Button from "@mui/material/Button";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Navigator from "./theme/Navigator";
import Header from "./theme/Header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
} from "@mui/material";
import { db } from "../containers/firebase";
import { RouterContext } from "../containers/custom-browser-router";
import Paper from "@mui/material/Paper";
import {  withStyles } from "@material-ui/core/styles";

const TableHeadDesign = withStyles((theme) => ({
  root: {
    backgroundColor: "#1A6776",
    border: "10px",
    borderRadius: "10px",
  },
}))(TableHead);

const TableHeaderCell = withStyles((theme) => ({
  root: {
    color: "white",
  },
}))(TableCell);

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

export default function Doctors(): React.ReactElement {
  const history = useHistory();
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [selected,setSelected]= React.useState<String>('');
  const [loader, setLoader] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClickOpen = (id: String) => {
    setOpen(true);
    setSelected(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const doctorsCollecationRef = collection(db, "/users/");
  const { currentUser, handleAuthChange, signOutUser } =
    React.useContext(RouterContext);

  const getDoctors = async () => {
    const datalist: any[] = [];
    const queryRef = query(
      doctorsCollecationRef,
      where("type", "==", '1')
    );
    const data = await getDocs(queryRef);
    await Promise.all(
      data.docs.map((doc) => {
        var data = doc.data();
        var id = doc.id;
        const final = {
          data,
          id
        }
       datalist.push(final);
      })
    );
    setDoctors(datalist);
    setLoader(false);
  };

  const save = async () => {
    const docRef = doc(db, "/users/", `${selected}`);
    await updateDoc(docRef,{
      'isApproved':true
    });
  };

  React.useEffect(() => {
    handleAuthChange({
      err: () => {
        history.push("/login");
      },
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (currentUser !== null) {
      getDoctors();
    }
    // eslint-disable-next-line
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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Header onDrawerToggle={handleDrawerToggle} title={"Doctors List"} />
          <Box
            component="main"
            flex={1}
            overflow="auto"
            sx={{
              flex: 1,
              py: 6,
              overflow: "auto",
              px: 4,
              bgcolor: "#eaeff1",
            }}
          >
            <Paper sx={{ maxWidth: "95%", margin: "auto", padding: "15px" }}>
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
                  <DialogTitle>Approve ?</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                   Do you want to approve this doctor ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button
                      onClick={async () => {
                        setLoader(true);
                        handleClose();
                        await save();
                        window.location.reload();
                      }}
                    >
                      approve
                    </Button>
                  </DialogActions>
                </Dialog>
                
                  <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHeadDesign>
                        <TableRow>
                          <TableHeaderCell align="left">
                            ID
                          </TableHeaderCell>
                          <TableHeaderCell align="left">
                            FullName
                          </TableHeaderCell>
                          <TableHeaderCell align="left">
                            PhoneNumber
                          </TableHeaderCell>
                          <TableHeaderCell align="left">
                            isApproved
                          </TableHeaderCell>
                        </TableRow>
                      </TableHeadDesign>
                      {doctors.length != 0 ? (
                        <>
                          <TableBody>
                            {doctors.map((doctor, index) => {
                              return (
                                <>
                                  <TableRow
                                    key={index}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      align="left"
                                    >
                                      {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                    <Typography
                                          variant="body2"
                                          color="text.info"
                                        >
                                          {doctor.data.fullName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                    <Typography
                                          variant="body2"
                                          color="text.info"
                                        >
                                          {doctor.data.phoneNumber}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                      {doctor.data.isApproved ? (
                                        <Typography
                                          variant="body2"
                                          color="text.info"
                                        >
                                       Approved
                                        </Typography>
                                      )  : (
                                        <Button onClick={()=> handleClickOpen(`${doctor.id}`)} variant="contained" size="small" >
                                        Approve
                                      </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                          </TableBody>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" color="text.secondary">
                           THERE IS NO DOCTORS
                          </Typography>
                        </>
                      )}
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
