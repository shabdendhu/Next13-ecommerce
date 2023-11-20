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
import { apiGet, apiPost, apiPut, apiGetById, apiDelete } from "@/helpers/api";

function createData(productIds, screenName, sequence) {
  return { productIds, screenName, sequence };
}
const emptySuggestion = {
  productIds: [],
  screenName: "",
  sequence: 0,
  name: "",
};
export default function CategoryManager() {
  // const [category, setCategory] = useState([]);
  const size = useWindowSize();
  const [newSuggestion, setNewsuggestion] = useState(emptySuggestion);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleViewProduct = async (id) => {
    setOpen(true);
    const getSuggestionById = await apiGetById("/api/productsuggestion", id);
    setNewsuggestion(getSuggestionById.data);
    console.log(getSuggestionById.data);
  };
  const handleDeleteSuggestion = async (id) => {
    try {
      const delRes = await apiDelete("/api/productsuggestion", id);
      console.log({ delRes });
      handleCloseModal();
      getAllSuggestion();
    } catch (error) {
      console.error(error);
    }
  };
  const getAllSuggestion = async () => {
    const suggestionRes = await apiGet("/api/productsuggestion");
    console.log({ suggestionRes });
    setSuggestions(suggestionRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newSuggestion);
    if (newSuggestion._id) {
      const editRes = await apiPut(
        "/api/productsuggestion/" + newSuggestion._id,
        newSuggestion
      );
      // edit
    } else {
      const addRes = await apiPost("/api/productsuggestion", newSuggestion);
      // add
    }
    handleCloseModal();
    getAllSuggestion();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewsuggestion(emptySuggestion);
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
            suggestions={newSuggestion}
            setSuggestions={setNewsuggestion}
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
              <TableCell>Name</TableCell>
              <TableCell>Products</TableCell>
              <TableCell align="right">ScreenName</TableCell>
              <TableCell align="right">Sequence</TableCell>
              {/* <TableCell align="right">SubCategory</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Meta Keywords</TableCell>
              <TableCell align="right">Is Active</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {suggestions.map((row) => (
              <TableRow
                key={row.name}
                onClick={() => console.log("slkdjddsj")}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell component="th" scope="row">
                  {row.productIds.map((e) => (
                    <>
                      {e.name} <b>|</b>{" "}
                    </>
                  ))}
                </TableCell>
                <TableCell align="right">{row.screenName}</TableCell>
                <TableCell align="right">{row.sequence}</TableCell>
                <TableCell align="right">
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                    onClick={() => handleViewProduct(row._id)}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => handleDeleteSuggestion(row._id)}
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
