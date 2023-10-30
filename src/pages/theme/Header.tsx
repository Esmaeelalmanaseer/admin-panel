import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
  onDrawerToggle: () => void;
  title:string
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;
  const {title} = props;

  return (
    <React.Fragment>
      <AppBar color="primary" style={{ background: '#1a6776' }} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
             <Grid container alignItems="center" spacing={1} pr={"10px"} pt={"5px"}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
               {title}
              </Typography>
            </Grid>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
     
    </React.Fragment>
  );
}