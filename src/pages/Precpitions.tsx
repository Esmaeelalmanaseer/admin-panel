import * as React from "react";
import Moment from "react-moment";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { withStyles } from "@material-ui/core/styles";
import Navigator from "./theme/Navigator";
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { db } from "../containers/firebase";
import {RouterContext} from "../containers/custom-browser-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./theme/Header";
import axios from "axios";

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
export default function Precpitions(): React.ReactElement {
  const history = useHistory();
  const [chats, setChats] = React.useState<any[]>([]);
  const [loader, setLoader] = React.useState<boolean>(true);
  const ref = React.useRef(false);
  const chatsCollecationRef = collection(db, "/presciptions/");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { currentUser, handleAuthChange, signOutUser } =
    React.useContext(RouterContext);

  const getChats = async () => {
    const datalist: any[] = [];
    const queryRef = query(
      chatsCollecationRef,
     orderBy('timeCreated')
    );
    const data = await getDocs(queryRef);
    await Promise.all(
      data.docs.map(async (document) => {
        var docdata = document.data();
        const docRef = doc(db, "/users/", `${docdata.doctor}`);
        const docSnap = await getDoc(docRef);
        var doctordata = docSnap.data();
        const docRef2 = doc(db, "/patients/", `${docdata.patient}`);
        const docSnap2 = await getDoc(docRef2);
        var patientdata = docSnap2.data();
        const docRef3 = doc(db, "/medicine/", `${docdata.medicine}`);
        const docSnap3 = await getDoc(docRef3);
        var medicinedata = docSnap3.data();
        const finaldata = {
          docdata,
          doctordata,
          patientdata,
          medicinedata
        };
        datalist.push(finaldata);
      })
    );
    setChats(datalist);
    setLoader(false);
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
      getChats();
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
          <Header onDrawerToggle={handleDrawerToggle} title={"Presciptions logs"} />
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
                  <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                      <TableHeadDesign>
                        <TableRow>
                          <TableHeaderCell align="right">
                          ID
                          </TableHeaderCell>
                          <TableHeaderCell align="right">
                          Patient
                          </TableHeaderCell>
                          <TableHeaderCell align="right">
                         Doctor
                          </TableHeaderCell>
                          <TableHeaderCell align="right">
                          Medicine
                          </TableHeaderCell>
                          <TableHeaderCell align="right">
                          Dose
                          </TableHeaderCell>
                          <TableHeaderCell align="right">
                          IsTaken
                          </TableHeaderCell>
                        </TableRow>
                      </TableHeadDesign>
                      {chats.length != 0 ? (
                        <>
                          <TableBody>
                          {chats.map((chat, index) => {
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
                                    align="right"
                                  >
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="right">
                                    {chat.patientdata.fullName}
                                  </TableCell>
                                  <TableCell align="right">
                                    {chat.doctordata.fullName}
                                  </TableCell>
                                  <TableCell align="right">
                                  {chat.medicinedata.name}
                                  </TableCell>
                                  <TableCell align="right">
                                  {chat.docdata.quantity}
                                  </TableCell>
                                  <TableCell align="right">
                                  {chat.docdata.isTaken ? (
                                        <Typography
                                          variant="body2"
                                          color="text.info"
                                        >
                                       Taken
                                        </Typography>
                                      )  : (
                                        <Typography
                                        variant="body2"
                                        color="text.info"
                                      >
                                     NOT TAKEN
                                      </Typography>
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
                            لا يوجد محادثات
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
