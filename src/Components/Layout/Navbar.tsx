import App from "@/pages/_app";
import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { CustomTypography } from "../Typographies";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

interface NavbarProps {
  open: boolean; // Declare open as a boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ open, setOpen }) => {
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <AppBar
        sx={{
          background: "#1C2534",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={0}
      >
        <Toolbar>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
                  <MenuIcon
                    sx={{ color: "#fff" }}
                    onClick={handleDrawerToggle}
                  />
                </IconButton>
                <Image
                  src="/noma.jpeg"
                  alt="logo"
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <CustomTypography
                  sx={{ color: "#fff", fontSize: { xs: "12px" } }}
                >
                  Referral Dashboard
                </CustomTypography>
              </Box>
              <ConnectWallet />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
