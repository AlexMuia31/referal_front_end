import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import { CustomTypography } from "@/Components/Typographies";
import React, { useEffect, useState } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "@/constants";
import { useGetUsersQuery } from "../Components/APICalls/services";
import ReferralsTable from "@/Components/ReferralsTable";
import Tier2referrals from "@/Components/Tier2referrals";

type User = {
  id: number;
  location: string;
  email: string;
  name: string;
  phone: string;
  wallet: string;
};

export default function Home() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery({});
  console.log("users", users);
  const address = useAddress();
  const { data: count, isLoading: countLoading } = useContractRead(
    contract,
    "getSecondLevelReferrals",
    [address]
  );
  const [referrer, setReferrer] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const [mergedData, setMergedData] = useState<User[]>([]);

  const { mutateAsync: register, isLoading } = useContractWrite(
    contract,
    "register"
  );

  const { data: referred, isLoading: referredLoading } = useContractRead(
    contract,
    "getReferredAddresses",
    [address]
  );

  const { data: referrals, isLoading: referralsLoading } = useContractRead(
    contract,
    "getUserReferrals",
    [address]
  );

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  //handle referrer change
  const handleReferrerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferrer(event.target.value);
  };
  //handle register
  // Handle register
  const Register = async () => {
    try {
      if (!referrer) {
        setSnackbarMessage("Please enter a wallet address.");
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
        return;
      }
      const data = await register({ args: [referrer] });
      setSnackbarMessage("Wallet address registered successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      console.log("contract call success", data);
    } catch (e) {
      setSnackbarMessage("Failed to register wallet address.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.log("contract call failure", e);
    }
  };

  const openUniswap = () => {
    window.open("https://app.uniswap.org/swap", "_blank");
  };

  useEffect(() => {
    if (users && referred) {
      const user = users.find((user: any) => user.wallet === referred);
      setMergedData(user);
    }
  }, [users, referred, mergedData]);

  console.log("Merged data is ...", mergedData);

  const numberOfRefferals = count ? count.length : 0;

  return (
    <>
      <Head>
        <title>referral</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ background: "#E8E9E9", minHeight: "100vh" }}>
        <Toolbar />
        <Container maxWidth="xl">
          <h1>Welcome to the Dashboard !</h1>
          <Box
            sx={{
              mt: "3%",
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              size="small"
              placeholder="Enter Referrer address"
              sx={{ width: "80%" }}
              onChange={handleReferrerChange}
            />
            <Box>
              <Button
                variant="contained"
                sx={{ mt: "2%", height: "100%" }}
                onClick={Register}
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mt: "5%" }}>
            <Grid item xs={12} md={3} sm={6}>
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "5px 2px 2px gray",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <CustomTypography
                  sx={{ textAlign: "left", fontSize: "14px", fontWeight: 300 }}
                >
                  Total Tokens Accrued
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: { xs: "20px", md: "30px" },
                    fontWeight: 300,
                  }}
                >
                  30.2
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#FF0000",
                  }}
                >
                  0.5 % Decrease
                </CustomTypography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "5px 2px 2px gray",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <CustomTypography
                  sx={{ textAlign: "left", fontSize: "14px", fontWeight: 300 }}
                >
                  No. of Tier 1 referrals
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: { xs: "20px", md: "30px" },
                    fontWeight: 300,
                  }}
                >
                  {referralsLoading ? "Loading..." : referrals}
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "green",
                  }}
                >
                  20 % increase
                </CustomTypography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "5px 2px 2px gray",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <CustomTypography
                  sx={{ textAlign: "left", fontSize: "14px", fontWeight: 300 }}
                >
                  No. of Tier 2 referrals
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: { xs: "20px", md: "30px" },
                    fontWeight: 300,
                  }}
                >
                  {countLoading ? "Loading..." : numberOfRefferals}
                </CustomTypography>
                <CustomTypography
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "green",
                  }}
                >
                  50 % increase
                </CustomTypography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sm={6}>
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "5px 2px 2px gray",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <Button
                  onClick={openUniswap}
                  variant="contained"
                  sx={{
                    height: "100%",
                    width: "100%",
                    "&:hover": { backgroundColor: "#1A76D2" },
                  }}
                >
                  Buy Eth on Uniswap
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: "5%" }}>
            <Grid item xs={12} md={6} sm={6}>
              <Box>
                <CustomTypography sx={{ textAlign: "left" }}>
                  Your Tier 1 referrals
                </CustomTypography>
              </Box>
              <Box sx={{ mt: "5%" }}>
                <ReferralsTable />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <Box>
                <CustomTypography sx={{ textAlign: "left" }}>
                  Your Tier 2 referrals
                </CustomTypography>
              </Box>
              <Box sx={{ mt: "5%" }}>
                <Tier2referrals />
              </Box>
            </Grid>
          </Grid>
          {/* Snackbar */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
}
