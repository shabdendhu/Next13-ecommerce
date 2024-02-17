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
import { Button, ButtonBase, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionsModal from "@/components/base/Modal";
import BannerForm from "@/components/forms/Banner";
import useWindowSize from "@/hooks/useWindowSize";
import { apiGet, apiPost, apiGetById, apiDelete, apiPut } from "@/helpers/api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const emptyBanner = {
  title: "",
  imageUrl: "",
  targetURL: "",
  startDate: "",
  pathURL: "",
  endDate: "",
  isActive: false,
};

export default function CategoryManager() {
  const [banner, setBanner] = useState(emptyBanner);
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const size = useWindowSize();

  const handleViewBanner = async (id) => {
    setOpen(true);
    const getBannerById = await apiGetById("/api/banner", id);
    setBanner(getBannerById.data);
  };

  const handleDelete = (id) => {
    const deleteRes = apiDelete("/api/banner", id);
    getAllBanner();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setBanner(emptyBanner);
  };

  const getAllBanner = async () => {
    const bannerRes = await apiGet("/api/banner");
    setBanners(bannerRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!banner?._id) {
      const addRes = await apiPost("/api/banner", banner);
    } else {
      const editRes = await apiPut("/api/banner/" + banner._id, banner);
    }
    setBanner(emptyBanner);
    getAllBanner();
    handleCloseModal();
  };

  useEffect(() => {
    getAllBanner();
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
          BANNER MANAGER
        </h1>
        <TransitionsModal
          formName={banner._id ? "Edit Banner" : "Add Banner"}
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
          open={open}
          setOpen={(e) => setOpen(e)}
        >
          <BannerForm
            banner={banner}
            setBanner={setBanner}
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
              <TableCell>Title</TableCell>
              <TableCell align="right">Image Url</TableCell>
              <TableCell align="right">Target URL</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Is Active</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={row.imageUrl}
                    alt="Image"
                    style={{ width: "50px", height: "auto" }}
                  />
                </TableCell>
                <TableCell align="right">{row.targetURL}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">
                  <Switch checked={row.isActive} />
                </TableCell>
                <TableCell align="right">
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                    onClick={() => handleViewBanner(row._id)}
                  >
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase
                    style={{
                      marginRight: 10,
                      padding: "5px 10px",
                      borderRadius: 10,
                    }}
                    onClick={() => handleDelete(row._id)}
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
