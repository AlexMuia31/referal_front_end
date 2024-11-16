import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "@/constants";

const ReferralsTable = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: referred, isLoading: referredLoading } = useContractRead(
    contract,
    "getReferredAddresses",
    [address]
  );

  const rows = referred || []; // Default to an empty array if referred is undefined

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Earned</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referredLoading ? ( // Check if data is still loading
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress /> {/* Show loading indicator */}
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? ( // Check if there are no referred users
            <TableRow>
              <TableCell colSpan={4} align="center">
                No referred users available.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row: any, index: number) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {referredLoading ? "Loading..." : referred[index]}
                </TableCell>
                <TableCell align="right">kenya</TableCell>
                <TableCell align="right">200</TableCell>
                <TableCell align="right">12/2022</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReferralsTable;
