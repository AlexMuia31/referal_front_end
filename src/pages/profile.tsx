import { CustomTypography } from "@/Components/Typographies";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Toolbar,
} from "@mui/material";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import {
  useCreateUsersMutation,
  useGetUsersQuery,
} from "../Components/APICalls/services";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type User = {
  id: number;
  location: string;
  email: string;
  name: string;
  phone: string;
  wallet: string;
};

const Profile = () => {
  //get users
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery({});
  console.log("users", users);
  //create users
  const [createUsers, { data, error, isLoading }] = useCreateUsersMutation();
  const address = useAddress();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    wallet: address,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log("user is...", user);
  const handleCreateUser = async (event: any) => {
    event.preventDefault();

    try {
      await createUsers({
        name: user.name,
        phone: user.phone,
        email: user.email,
        location: user.location,
        wallet: address,
      });

      console.log("Data has been sent successfully!");
    } catch (error) {
      // Handle error
      console.error("Error while sending data:", error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (users && address) {
      const userWithConnectedWallet = users.find(
        (user: { wallet: string }) =>
          user.wallet.toLowerCase() === address.toLowerCase()
      );

      setCurrentUser(userWithConnectedWallet);
    }
  }, [users, address]);

  return (
    <Box>
      <Toolbar />
      <Box>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ background: "#fff", p: "4%", borderRadius: "10px" }}>
                {" "}
                <CustomTypography sx={{ textAlign: "left" }}>
                  My profile
                </CustomTypography>
                <Box sx={{ mt: "5%" }}>
                  <CustomTypography
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "gray",
                    }}
                  >
                    Name
                  </CustomTypography>

                  {!isLoadingUsers && currentUser && (
                    <CustomTypography
                      sx={{
                        textAlign: "left",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      {currentUser.name}
                    </CustomTypography>
                  )}
                  <CustomTypography
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "gray",
                      mt: "5%",
                    }}
                  >
                    Wallet Address
                  </CustomTypography>
                  <CustomTypography
                    sx={{
                      textAlign: "left",
                      fontWeight: 300,
                      fontSize: "16px",
                    }}
                  >
                    {address
                      ? `${address.slice(0, 6)}...${address.slice(-4)}`
                      : "Connect Your wallet"}
                  </CustomTypography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <form onSubmit={handleCreateUser}>
                <Box sx={{ background: "#fff", p: "4%", borderRadius: "10px" }}>
                  <Box sx={{ maxWidth: "700px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 4,
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                        <CustomTypography
                          sx={{
                            textAlign: "left",
                            fontWeight: 300,
                            fontSize: "14px",
                          }}
                        >
                          Full Name
                        </CustomTypography>
                        <TextField
                          placeholder="John Doe"
                          fullWidth
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                        <CustomTypography
                          sx={{
                            textAlign: "left",
                            fontWeight: 300,
                            fontSize: "14px",
                          }}
                        >
                          Phone
                        </CustomTypography>
                        <TextField
                          placeholder="+254 73737373"
                          fullWidth
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ maxWidth: "700px", width: "100%", mt: "2%" }}>
                    <CustomTypography
                      sx={{
                        textAlign: "left",
                        fontWeight: 300,
                        fontSize: "14px",
                      }}
                    >
                      Email
                    </CustomTypography>
                    <TextField
                      placeholder="email"
                      fullWidth
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ maxWidth: "700px", width: "100%", mt: "2%" }}>
                    <CustomTypography
                      sx={{
                        textAlign: "left",
                        fontWeight: 300,
                        fontSize: "14px",
                      }}
                    >
                      Location
                    </CustomTypography>
                    <TextField
                      placeholder="e.g Kenya"
                      name="location"
                      fullWidth
                      value={user.location}
                      onChange={handleChange}
                    />
                  </Box>
                  <Button
                    type="submit"
                    sx={{
                      color: "#fff",
                      background: "#000",
                      mt: "2%",
                      maxWidth: "700px",
                      "&:hover": {
                        background: "#000",
                      },
                    }}
                    fullWidth
                  >
                    Update
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Snackbar for update message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleSnackbarClose}
        message="Profile updated successfully"
      />
    </Box>
  );
};

export default Profile;
