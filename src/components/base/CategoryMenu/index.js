import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const CategoryMenu = ({ category, icon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event, id, haveChild) => {
    if (haveChild) return setAnchorEl(event.currentTarget);
    else router.push("/category?id=" + id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickSubmenu = (id) => {
    router.push("/category?id=" + id);
  };
  const renderSubcategories = (subcategories) => {
    return subcategories.map((subcategory) => (
      <CategoryMenu
        key={subcategory._id}
        category={subcategory}
        icon={
          <MenuItem
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => handleClickSubmenu(subcategory._id)}
          >
            {subcategory.name}
          </MenuItem>
        }
      />
    ));
  };
  console.log(category?.parent_category?._id);
  return (
    <>
      {!category?.parent_category?._id ? (
        <div
          onClick={(e) =>
            handleClick(e, category?._id, category?.subcategories?.length > 0)
          }
          style={{
            display: "flex",
            cursor: "pointer",
          }}
        >
          {icon}
          {category?.subcategories?.length ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      {category?.subcategories?.length && !category?.parent_category?._id ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {renderSubcategories(category.subcategories)}
        </Menu>
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoryMenu;
