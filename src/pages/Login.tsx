import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {RouterContext} from "../containers/custom-browser-router";
import myimage from './img/about.png';

export default function Login(): ReactElement {
  const history = useHistory();
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { logInUser, handleAuthChange, loading } = React.useContext(RouterContext);

  React.useEffect(() => {
    handleAuthChange({
      cb: () => {
        history.push("/home");
      },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(http://localhost:3000/og.webp)",
          // backgroundImage: "url(myimage)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
         Admin Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e:any) => {
              e.preventDefault();
              logInUser(email, password).then((value:any) => {
                if(value != null){
                  setError(value.toString());
                }
                
              });
            }}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={({ target }) => setEmail(target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
            <Typography color={"red"} fontSize={"12px"}>
              {error}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Login
            </Button>
          </Box>
          <Typography fontSize={"12px"} variant="h5">
        WASFA 2023
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
