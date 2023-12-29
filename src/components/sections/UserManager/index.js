"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionsModal from "@/components/base/Modal";
import ProductForm from "@/components/forms/ProductForms";
import useWindowSize from "@/hooks/useWindowSize";
import { apiGet } from "@/helpers/api";
function createData(username, email, password, role, profile, orders) {
  return { username, email, password, role, profile, orders };
}

export default function UserManager() {
  const [users, setUsers] = React.useState([]);
  const size = useWindowSize();
  const getUsers = async () => {
    const res = await apiGet("/api/user");
    setUsers(res.data);
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div
      style={{
        // maxHeight: "50vh",
        // border: "1px solid red",
        width: "100%",
      }}
    >
      <div
        style={{
          // position: "sticky",
          // top: 90,
          padding: "10px",
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          USER MANAGER
        </h1>
        <TransitionsModal formName={"Add Product"}>
          <ProductForm />
        </TransitionsModal>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxHeight: size.height - 200,
          // border: "1px solid red",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>PROFILE</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">ROLE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="right">
                  <img
                    style={{
                      maxHeight: "50px",
                      borderRadius: "50%",
                    }}
                    src={
                      row?.profile?.avatar ||
                      "https://www.pngitem.com/pimgs/m/80-800373_it-benefits-per-users-default-profile-picture-green.png"
                    }
                  />
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
