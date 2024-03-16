"use client";
import { apiGet, apiPut } from "@/helpers/api";
import { useSnackbar } from "@/hooks/useSnakBar";
import useWindowSize from "@/hooks/useWindowSize";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

export default function UserManager() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const size = useWindowSize();
  const { openSnackbar } = useSnackbar();

  const getUsers = async () => {
    const res = await apiGet(
      `/api/user?page=${page}&limit=${10}`,
      {},
      openSnackbar
    );
    setUsers(res.data);
    setTotalPages(res.totalPages);
  };

  React.useEffect(() => {
    getUsers();
  }, [page]);

  const toggleUserRole = async (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.role = user.role === "customer" ? "admin" : "customer";
      }
      return user;
    });
    setUsers(updatedUsers);
    // Send a PUT request to update user role on the server
    await apiPut(
      `/api/user/${userId}`,
      {
        role: updatedUsers.find((user) => user._id === userId).role,
      },
      openSnackbar
    );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxHeight: size.height - 200,
        }}
      >
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">PROFILE</TableCell>
              <TableCell align="left">USERNAME</TableCell>
              <TableCell align="left">EMAIL</TableCell>
              <TableCell align="left">ROLE</TableCell>
              <TableCell align="left">Toggle Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="left" size="small">
                  <Avatar src={row?.profile?.avatar} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                <TableCell align="left">{row?.role}</TableCell>
                <TableCell align="left">
                  Customer
                  <Switch
                    checked={row.role === "admin"}
                    onChange={() => toggleUserRole(row._id)}
                    inputProps={{ "aria-label": "toggle user role" }}
                  />
                  Admin
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
}
