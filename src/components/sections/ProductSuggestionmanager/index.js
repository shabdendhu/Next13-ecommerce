"use client";
import TransitionsModal from "@/components/base/Modal";
import SuggestionForm from "@/components/forms/SuggestionForms";
import { apiDelete, apiGet, apiGetById, apiPost, apiPut } from "@/helpers/api";
import useWindowSize from "@/hooks/useWindowSize";
import screenUrls from "@/static/screens";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Pagination from "@mui/material/Pagination";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { useEffect, useState } from "react";

const emptySuggestion = {
  productIds: [],
  screenName: "",
  sequence: 0,
  name: "",
};
export default function CategoryManager() {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState(emptySuggestion);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = useWindowSize();

  const handleCloseModal = () => {
    setOpen(false);
    setNewSuggestion(emptySuggestion);
  };

  const handleViewProduct = async (id) => {
    setOpen(true);
    const getSuggestionById = await apiGetById("/api/productsuggestion", id);
    setNewSuggestion(getSuggestionById.data);
  };

  const handleDeleteSuggestion = async (id) => {
    try {
      const delRes = await apiDelete("/api/productsuggestion", id);
      handleCloseModal();
      getAllSuggestion();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSuggestion = async () => {
    const res = await apiGet(`/api/productsuggestion?page=${page}&limit=${10}`);
    setSuggestions(res.data);
    setTotalPages(res.totalPages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newSuggestion._id) {
      const editRes = await apiPut(
        "/api/productsuggestion/" + newSuggestion._id,
        newSuggestion
      );
    } else {
      const addRes = await apiPost("/api/productsuggestion", newSuggestion);
    }
    handleCloseModal();
    getAllSuggestion();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getAllSuggestion();
  }, [page]);

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
            setSuggestions={setNewSuggestion}
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
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
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
                <TableCell align="right">
                  <Link href={row.screenName}>
                    {
                      (
                        screenUrls.find(
                          (item) => item.value === row.screenName
                        ) || {}
                      ).name
                    }
                  </Link>
                </TableCell>
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
