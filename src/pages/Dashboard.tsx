import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navigator from './theme/Navigator';
import Backdrop from "@mui/material/Backdrop";
import Header from './theme/Header';
import Moment from "react-moment";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  DocumentData,
  where,
} from "firebase/firestore";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { db } from "../containers/firebase";
import { RouterContext } from "../containers/custom-browser-router";

let theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
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
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
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
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
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
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#138356',
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
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
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

const classes = {
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: 20,
    textAlign: "center",
  }
};
export default function Dashboard(): React.ReactElement {
  const history = useHistory();
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [patients, setPatients] = React.useState<any[]>([]);
  const [pharmices, setPharmacy] = React.useState<any[]>([]);
  const [precpitions, setPrecpitions] = React.useState<any[]>([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const doctorsCollecationRef = collection(db, "/users/");
  const patientsCollecationRef = collection(db, "/patients/");
  const PressCollecationRef = collection(db, "/presciptions/");
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [userinfo, setUserInfo] = React.useState<DocumentData>();
  const [loader, setLoader] = React.useState<boolean>(true);
  const { currentUser, handleAuthChange, type } =
    React.useContext(RouterContext);

  const getInfoAboutData = async () => {
    await getUserInfo();
    const queryRef = query(
      doctorsCollecationRef,
      where("type", "==", '1')
    );
    const data = await getDocs(queryRef);
    setDoctors(data.docs.map((doc) => ({ ...doc.data() })));


    const queryRef2 = query(
      doctorsCollecationRef,
      where("type", "==", '2')
    );
    const data2 = await getDocs(queryRef2);
    setPharmacy(data2.docs.map((doc) => ({ ...doc.data() })));


    const queryRef3 = query(
      patientsCollecationRef,
      where("type", "==", '3')
    );
    const data3 = await getDocs(queryRef3);
    setPatients(data3.docs.map((doc) => ({ ...doc.data() })));
    
    setLoader(false);
  };

  const getUserInfo = async () => {
    const docRef = doc(db, "/admin/", `${currentUser?.userId}`);
    const docSnap = await getDoc(docRef);
    setUserInfo(docSnap.data());
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
      getInfoAboutData();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
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
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: "100vh" }}>
          <Header onDrawerToggle={handleDrawerToggle} title={"DashBoard"} />
          <Box flex={1} overflow="auto" component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Paper sx={{ maxWidth: "95%", margin: 'auto', padding: "15px" }}>

              {loader ? <>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loader}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </> : <>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                 {userinfo?.name}
                </Typography>
                <Grid  container spacing={2}>
                <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://www.michiganmedicine.org/sites/default/files/styles/article_main_image/public/blog/michigan-med-l-doc-wardrobe.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Doctors
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                         There is {doctors.length} / Doctor
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Check
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://www.freevector.com/uploads/vector/preview/24826/Pharmacy-03.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Pharmacies
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                         There is {pharmices.length} / Pharmacy
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Check
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={8}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image="https://www.freevector.com/uploads/vector/preview/24826/Pharmacy-03.jpg"
                        height="140"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Patients 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                         There is {patients.length} / Patients 
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Check
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                 
                </Grid>
              </>}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
