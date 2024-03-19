import React, { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/helpers/api";
import { useSnackbar } from "@/hooks/useSnakBar";
import OrderForm from "../../forms/OrderForms";
import TransitionsModal from "@/components/base/Modal";
import CopyButton from "@/components/base/CopyButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import useWindowSize from "@/hooks/useWindowSize";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};
const STATUS_OPTIONS = [
  "All",
  "ordered",
  "payment",
  "shipped",
  "delivered",
  "canceled",
];
const PAYMENT_METHOD_OPTIONS = [
  "phonepay",
  "credit_card",
  "paypal",
  "cash_on_delivery",
];
const PAYMENT_STATUS_OPTIONS = ["pending", "completed"];

const DeliveryStatusCell = ({ orderId, currentStatus, fetchOrders }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const { openSnackbar } = useSnackbar();

  const handleDeliveryStatusChange = async (status) => {
    try {
      const updateRes = await apiPut(
        "/api/order/change-delivery-date",
        {
          newStatus: status,
          id: orderId,
        },
        openSnackbar
      );

      if (updateRes?.success) {
        openSnackbar("success", "Delivery Status Changed Successfully");
        // Optionally, update the local state or refetch the orders after updating the status
        fetchOrders();
      } else {
        openSnackbar("error", "Error Changing Delivery Status");
      }
    } catch (error) {
      console.error("Error:", error);
      openSnackbar("error", "Failed to update delivery status");
    }
  };

  return (
    <TableCell align="left">
      <Select
        value={newStatus}
        size="small"
        onChange={(e) => {
          setNewStatus(e.target.value);
          handleDeliveryStatusChange(e.target.value);
        }}
        // onBlur={handleDeliveryStatusChange}
      >
        {["ordered", "payment", "shipped", "delivered", "canceled"].map(
          (status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          )
        )}
      </Select>
    </TableCell>
  );
};
const DatePickerCell = ({ date, openDialog }) => {
  return (
    <TableCell align="left">
      {formatDate(dayjs(date))}
      <IconButton onClick={() => openDialog(dayjs(date))} aria-label="delete">
        <DeliveryDiningIcon />
      </IconButton>
    </TableCell>
  );
};

export default function OrderManager() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { openSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setDialogOpen(true);
  };

  const fetchOrders = async () => {
    let queryParams = `?page=${page}&limit=${10}`;
    if (searchQuery) queryParams += `&search=${searchQuery}`;
    if (statusFilter) queryParams += `&status=${statusFilter}`;
    const res = await apiGet(
      `/api/order?page=${queryParams}`,
      {},
      openSnackbar
    );
    setOrders(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, searchQuery, statusFilter]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilter = (event) => {
    console.log(event.target.value);
    if (event.target.value == "All") return setStatusFilter(null);
    setStatusFilter(event.target.value);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleExpectedDateChange = async (newDate) => {
    const changeRes = await apiPut(
      "/api/order/change-delivery-date",
      {
        newDeliveryDate: dayjs(newDate).format("YYYY-MM-DD"),
        id: selectedOrderId,
      },
      openSnackbar
    );

    if (changeRes?.success) {
      openSnackbar("success", "Delivery Date Changed Successfully");
      handleCloseDialog();
    } else {
      openSnackbar("error", "Error Changing Delivery Date");
    }
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
          maxWidth: "90vw",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: 600 }}>ORDER MANAGER</h1>
          {/* <TextField
            label="Search Orders"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            style={{ marginBottom: "10px" }}
          /> */}
          {/* Add filter options */}
          <Select
            size="small"
            value={statusFilter}
            onChange={handleStatusFilter}
            displayEmpty
          >
            <MenuItem value={null} disabled>
              Status Filter
            </MenuItem>
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </div>
        <TransitionsModal
          open={open}
          setOpen={setOpen}
          formName={"Add Order"}
          handleClose={() => setOpen(false)}
          openButton={
            <Button
              onClick={() => setOpen(!open)}
              style={{ background: "blue", color: "white" }}
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
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Total Amount</TableCell>
              <TableCell align="left">Processing Status</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Expected Delivery Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "20px",
                }}
              >
                <TableCell size="small">
                  <CopyButton status={order.status} textToCopy={order._id} />
                </TableCell>
                <TableCell size="small" align="left">
                  {order?.user?.email}
                </TableCell>
                <TableCell size="small" align="left">
                  {order?.user?.mobile}
                </TableCell>
                <TableCell align="left">
                  ₹{Math.round(order.totalAmount)}
                </TableCell>
                <DeliveryStatusCell
                  orderId={order._id}
                  currentStatus={order.status}
                  fetchOrders={fetchOrders}
                />
                <TableCell align="left">{order.paymentMethod}</TableCell>
                <TableCell align="left">{order.paymentStatus}</TableCell>
                <TableCell align="left">
                  {formatDate(order.createdAt)}
                </TableCell>
                <DatePickerCell
                  date={order.expectedDeliveryDate}
                  openDialog={(e) => {
                    handleOpenDialog(order._id);
                    setSelectedDate(e);
                  }}
                />
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
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select New Date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a new expected delivery date:
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)} // Update selectedDate when date changes
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleExpectedDateChange(selectedDate)}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
