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
import CategoryForm from "@/components/forms/CategoryForms";
import OrderForm from "../../forms/OrderForms";
import useWindowSize from "@/hooks/useWindowSize";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const sampleOrders = [
  {
    _id: "1",
    user: "user123",
    totalAmount: 50.99,
    status: "shipped",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-02T10:30:00Z",
  },
  {
    _id: "2",
    user: "user456",
    totalAmount: 35.5,
    status: "delivered",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    createdAt: "2023-02-05T15:45:00Z",
    updatedAt: "2023-02-07T09:20:00Z",
  },
  {
    _id: "3",
    user: "user789",
    totalAmount: 75.25,
    status: "processing",
    paymentMethod: "cash_on_delivery",
    paymentStatus: "pending",
    createdAt: "2023-03-10T12:10:00Z",
    updatedAt: "2023-03-11T14:55:00Z",
  },
  {
    _id: "4",
    user: "user101",
    totalAmount: 20.75,
    status: "pending",
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    createdAt: "2023-04-20T18:30:00Z",
    updatedAt: "2023-04-21T09:45:00Z",
  },
];
export default function OrderManager() {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = React.useState(sampleOrders);
  const size = useWindowSize();
  const handleCloseModal = () => {
    setOpen(false);
    // setProduct(emptyProduct);
  };
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
          ORDER MANAGER
        </h1>
        <TransitionsModal
          open={open}
          setOpen={(e) => setOpen(e)}
          formName={"Add Order"}
          handleClose={handleCloseModal}
          openButton={
            <Button
              onClick={() => setOpen(!open)}
              style={{
                background: "blue",
                color: "white",

                //   position: "relative",
                //   float: "right",
                //   zIndex: 9999,
              }}
            >
              ADD
            </Button>
          }
        >
          <OrderForm />
        </TransitionsModal>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Payment Status</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                onClick={() => console.log(`Clicked on order ${order._id}`)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {order._id}
                </TableCell>
                <TableCell align="right">{order.user}</TableCell>
                <TableCell align="right">{order.totalAmount}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">{order.paymentMethod}</TableCell>
                <TableCell align="right">{order.paymentStatus}</TableCell>
                <TableCell align="right">{order.createdAt}</TableCell>
                <TableCell align="right">{order.updatedAt}</TableCell>
                <TableCell align="right">
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                  >
                    <DeleteIcon />
                  </ButtonBase>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
