import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

const drawerWidth = 249;

const Dashlayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Navbar open={open} setOpen={setOpen} />
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#1C2534",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <Toolbar />
        <List>
          <Link href="/" onClick={handleDrawerToggle}>
            <ListItem sx={{ color: "#fff" }}>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem sx={{ color: "#fff" }}>
            <ListItemButton>
              <ListItemIcon>
                <Diversity3Icon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Referral" />
            </ListItemButton>
          </ListItem>
          <Link href="/profile" onClick={handleDrawerToggle}>
            <ListItem sx={{ color: "#fff" }}>
              <ListItemButton>
                <ListItemIcon>
                  <Person2Icon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem sx={{ color: "#fff" }}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: "#f6f7f9",
          minHeight: "100vh",
          flexGrow: 1,
          pt: { xs: "37px" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Dashlayout;
