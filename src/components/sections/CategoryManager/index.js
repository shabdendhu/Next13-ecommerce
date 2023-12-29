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
import CategoryForm from "@/components/forms/CategoryForms";
import useWindowSize from "@/hooks/useWindowSize";
import axios from "axios";
import { apiDelete, apiGet, apiGetById, apiPost, apiPut } from "@/helpers/api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const emptyCategory = {
  name: "",
  description: "",
  subcategories: [],
  image: "",
  meta_keywords: [],
  is_active: false,
};
export default function CategoryManager() {
  const [categories, setCategorys] = useState([]);
  const [newCategory, setNewCategory] = useState(emptyCategory);
  const size = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleViewCategory = async (id) => {
    setOpen(true);
    const getCategoryById = await apiGetById("/api/category", id);
    setNewCategory(getCategoryById?.data);
  };
  const getAllCategory = async () => {
    const categoryRes = await apiGet("/api/category");
    setCategorys(categoryRes.data);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setNewCategory(emptyCategory);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory?._id) {
      const addres = await apiPost("/api/category", newCategory);
    } else {
      const editRes = await apiPut(
        "/api/category/" + newCategory._id,
        newCategory
      );
    }
    getAllCategory();
    setNewCategory(emptyCategory);
    handleCloseModal();
  };
  const handleDelete = async (id) => {
    const deleteRes = await apiDelete("/api/category", id);
    getAllCategory();
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
          CATEGORY MANAGER
        </h1>
        <TransitionsModal
          formName={"Add Category"}
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
          <CategoryForm
            newCategory={newCategory}
            setNewCategory={setNewCategory}
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
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Parent Category</TableCell>
              <TableCell align="right">Sub Categories</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Meta Keywords</TableCell>
              <TableCell align="right">Is Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category.description}</TableCell>
                <TableCell align="right">
                  {category.parent_category
                    ? category.parent_category.name
                    : ""}
                </TableCell>
                <TableCell align="right">
                  {category.subcategories
                    .map((subcat) => subcat.name)
                    .join(", ")}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell align="right">
                  {category.meta_keywords.join(", ")}
                </TableCell>
                <TableCell align="right">
                  {category.is_active ? "active" : "disabled"}
                </TableCell>
                <TableCell align="right">
                  <ButtonBase
                    onClick={() => handleViewCategory(category?._id)}
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => handleDelete(category._id)}
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
