import * as React from "react";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Person2Icon from "@mui/icons-material/Person2";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { RouterContext } from "../../containers/custom-browser-router";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "#1A6776",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const history = useHistory();
  const { signOutUser } = React.useContext(RouterContext);

  return (
    <Drawer anchor="left" variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 20, color: "#fff" }}
        >
         Admin Panel
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
        >
          <ListItemButton selected={history.location.pathname == "/home"? true : false} sx={item}  onClick={() => {
            history.push("/home");
          }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>HomePage</ListItemText>
          </ListItemButton>
        </ListItem>
        <Box key={0} sx={{ bgcolor: "#101F33" }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: "#fff", textAlign:'center' }}>SHORTCUTS</ListItemText>
          </ListItem>
           <ListItem disablePadding key={0}>
            <ListItemButton
              selected={history.location.pathname == "/doctors"? true : false}
              sx={item}
              onClick={() => {
                history.push("/doctors");
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText sx={{'textAlign':'center'}}>Doctors</ListItemText>
            </ListItemButton>
          </ListItem> 
          <ListItem disablePadding key={0}>
            <ListItemButton
              selected={history.location.pathname == "/pharmacy"? true : false}
              sx={item}
              onClick={() => {
                history.push("/pharmacy");
              }}
            >
              <ListItemIcon>
                <RequestPageIcon />
              </ListItemIcon>
              <ListItemText sx={{'textAlign':'center'}}>Pharmacies</ListItemText>
            </ListItemButton>
          </ListItem> 
          <ListItem disablePadding key={0}>
            <ListItemButton
              selected={history.location.pathname == "/patients"? true : false}
              sx={item}
              onClick={() => {
                history.push("/patients");
              }}
            >
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
              <ListItemText sx={{'textAlign':'center'}}>Patients</ListItemText>
            </ListItemButton>
          </ListItem> 

          <ListItem disablePadding key={0}>
            <ListItemButton
              selected={history.location.pathname == "/addmedicine"? true : false}
              sx={item}
              onClick={() => {
                history.push("/addmedicine");
              }}
            >
              <ListItemIcon>
                <AddAPhotoIcon />
              </ListItemIcon>
              <ListItemText sx={{'textAlign':'center'}}>Add Medicine</ListItemText>
            </ListItemButton>
          </ListItem> 

          <ListItem disablePadding key={0}>
            <ListItemButton
              selected={history.location.pathname == "/precpitions"? true : false}
              sx={item}
              onClick={() => {
                history.push("/precpitions");
              }}
            >
              <ListItemIcon>
                <ChatBubbleIcon />
              </ListItemIcon>
              <ListItemText sx={{'textAlign':'center'}}>Precpitions</ListItemText>
            </ListItemButton>
          </ListItem> 
          <Divider sx={{ mt: 2 }} />
        </Box>
        <ListItemButton
        
        sx={{ ...item, ...itemCategory }}
          onClick={() => {
            signOutUser();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText sx={{'textAlign':'center'}} primary="LogOut" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
