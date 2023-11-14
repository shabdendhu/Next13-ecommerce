"use client";
import * as React from "react";
import { useEffect, useState } from "react";
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
import SuggestionForm from "@/components/forms/SuggestionForms";
import useWindowSize from "@/hooks/useWindowSize";
import axios from "axios";

function createData(productIds, screenName, sequence) {
  return { productIds, screenName, sequence };
}
const emptyProduct = {
  name: "",
  description: "",
  price: 0,
  category_ids: [],
  brand: "",
  stock_quantity: 0,
  images: [],
  attributes: [],
  ratings: {
    average: 0,
    count: 0,
  },
  reviews: [],
  created_at: new Date(),
  updated_at: new Date(),
  sku: "",
  weight: 0,
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  tags: [],
  availability: "",
  shipping_info: {
    free_shipping: false,
    estimated_delivery: "",
  },
  related_products: [],
};
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

export default function CategoryManager() {
  // const [category, setCategory] = useState([]);
  const size = useWindowSize();
  const [suggestion, setSuggestion] = useState(emptyProduct);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const getAllSuggestion = async () => {
    const suggestionRes = await apiGet("/api/productsuggestion");
    setSuggestions(suggestionRes.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(suggestion);
    const addRes = apiPost("/api/productsuggestion", suggestion);
    console.log(addRes);
    setSuggestion(emptyProduct);
    setSuggestions([...suggestions, suggestion]);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setSuggestion(emptyProduct);
  };

  useEffect(() => {
    getAllSuggestion();
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
          PRODUCTION SUGGESTION MANAGER
        </h1>
        <TransitionsModal
          formName={"Add Suggestion"}
          handleClose={handleCloseModal}
          openButton={
            <Button
              onClick={() => setOpen(!open)}
              style={{
                background: "blue",
                color: "white",
              }}
            >
              ADD
            </Button>
          }
          open={open}
          setOpen={(e) => setOpen(e)}
        >
          <SuggestionForm
            suggestion={suggestion}
            setSuggestion={setSuggestion}
            handleSubmit={handleSubmit}
          />
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
              <TableCell>productIds</TableCell>
              <TableCell align="right">screenName</TableCell>
              <TableCell align="right">sequence</TableCell>
              {/* <TableCell align="right">SubCategory</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Meta Keywords</TableCell>
              <TableCell align="right">Is Active</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                onClick={() => console.log("slkdjddsj")}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.productIds}
                </TableCell>
                <TableCell align="right">{row.screenName}</TableCell>
                <TableCell align="right">{row.sequence}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
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
