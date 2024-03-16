import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Image from "next/image";
import { apiPost } from "@/helpers/api";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnakBar";

export default function CustomizedInputBase() {
  const route = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleClickSelectedItem = (e) => {
    route.push(`/product-details/${e?._id}`);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.trim() !== "") {
        setLoading(true);
        try {
          const searchRes = await apiPost(
            "/api/products/search",
            {
              query: searchText,
            },
            openSnackbar
          );
          setSearchProducts(
            searchRes.data.map((e) => ({ label: e.name, ...e }))
          );
        } catch (error) {
          console.error("Error searching products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchProducts([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          paddingInline: "10px",
          height: "100%",
        }}
      >
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={searchProducts}
          loading={loading}
          sx={{ width: "100%", border: "none" }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setSearchText(e.target.value)}
              variant="standard"
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              placeholder="Search Products..."
            />
          )}
          onChange={(e, i) => handleClickSelectedItem(i)}
          renderOption={(props, option) => (
            <Box
              onClick={() => console.log(option)}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <Image
                alt={option.name}
                width={40}
                height={40}
                src={option.images[0]}
              />
              {option.name} {option.price}₹
            </Box>
          )}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
