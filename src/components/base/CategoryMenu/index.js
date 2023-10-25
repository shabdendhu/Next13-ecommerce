import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

const CategoryMenu = ({ icon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div onClick={handleClick}>{icon}</div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => router.push("/category?id=achara")}>
          Achara
        </MenuItem>
        <MenuItem onClick={() => router.push("/category?id=pampada")}>
          Pampada
        </MenuItem>
      </Menu>
    </>
  );
};

export default CategoryMenu;
