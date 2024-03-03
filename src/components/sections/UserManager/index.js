"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TransitionsModal from "@/components/base/Modal";
import ProductForm from "@/components/forms/ProductForms";
import useWindowSize from "@/hooks/useWindowSize";
import { apiGet, apiPut } from "@/helpers/api";
import { Avatar, Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Pagination } from "@mui/material";

export default function UserManager() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const size = useWindowSize();

  const getUsers = async () => {
    const res = await apiGet(`/api/user?page=${page}&limit=${10}`);
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
    await apiPut(`/api/user/${userId}`, {
      role: updatedUsers.find((user) => user._id === userId).role,
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          padding: "10px",
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600 }}>USER MANAGER</h1>
        <TransitionsModal formName={"Add Product"}>
          <ProductForm />
        </TransitionsModal>
      </div>
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
              <TableCell>PROFILE</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">ROLE</TableCell>
              <TableCell align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="right" size="small">
                  <Avatar src={row?.profile?.avatar} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.role}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={row.role === "admin"}
                    onChange={() => toggleUserRole(row._id)}
                    inputProps={{ "aria-label": "toggle user role" }}
                  />
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
