"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonBase,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionsModal from "@/components/base/Modal";
import CategoryForm from "@/components/forms/CategoryForms";
import OrderForm from "../../forms/OrderForms";
import useWindowSize from "@/hooks/useWindowSize";
import { apiGet, apiPut } from "@/helpers/api";
import CopyButton from "@/components/base/CopyButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

const DatePickerCell = ({ date, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  };

  const handleOpenDialog = () => {
    setOpen(true);
    console.log(open);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmChange = () => {
    onChange(selectedDate);
    setOpen(false);
  };

  return (
    <>
      <TableCell align="left" onClick={handleOpenDialog}>
        {formatDate(selectedDate)}
      </TableCell>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Select New Date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a new expected delivery date:
          </DialogContentText>
          {/* <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              defaultValue={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default function OrderManager() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [orders, setOrders] = React.useState([]);
  const size = useWindowSize();
  const handleCloseModal = () => {
    setOpen(false);
    // setProduct(emptyProduct);
  };

  //fetch all order from http://localhost:3000/api/order
  const fetchOrders = async () => {
    const res = await apiGet(`/api/order?page=${page}&limit=${10}`);
    console.log(res);
    setOrders(res.data);
    setTotalPages(res.totalPages);
  };
  useEffect(() => {
    fetchOrders();
  }, [page]);
  const handlePageChange = (e, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleExpectedDateChange = async (e, id) => {
    const changeRes = await apiPut("/api/order/change-delivery-date", {
      newDeliveryDate: dayjs(e).format("YYYY-MM-DD"),
      id,
    });
    if (changeRes.success) {
      console.log("success");
    }
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
          maxWidth: "90vw",
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
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "60vh", maxWidth: "90vw" }}
      >
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Total Amount</TableCell>
              <TableCell align="left">Processing Status</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Expected Delivery Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  // cursor: "pointer",
                  height: "20px",
                }}
              >
                <TableCell size="small">
                  <CopyButton textToCopy={order._id} />
                </TableCell>
                <TableCell size="small" align="left">
                  {order.user.email}
                </TableCell>
                <TableCell align="left">
                  ₹{Math.round(order.totalAmount)}
                </TableCell>
                <TableCell align="left">{order.status}</TableCell>
                <TableCell align="left">{order.paymentMethod}</TableCell>
                <TableCell align="left">{order.paymentStatus}</TableCell>
                <TableCell align="left">
                  {formatDate(order.createdAt)}
                </TableCell>
                <DatePickerCell
                  date={order.expectedDeliveryDate}
                  onChange={(e) => handleExpectedDateChange(e, order._id)}
                />

                <TableCell align="left">
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
      <div>
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
