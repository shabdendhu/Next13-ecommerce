import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid red",
  boxShadow: 24,
  borderRadius: "10px",
  p: "10px",
  maxHeight: "80%",
  maxWidth: "80%",
};

export default function TransitionsModal({
  children,
  formName,
  openButton,
  open,
  setOpen,
  handleClose,
}) {
  const handleOpen = () => setOpen(true);

  return (
    <div>
      {openButton}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} display={"flex"} flexDirection={"column"}>
            <h2
              style={{
                // border: "1px solid red",
                height: "40px",
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
                fontWeight: 600,
              }}
            >
              {formName}
            </h2>
            <div style={{ padding: "10px", height: "100%", overflow: "auto" }}>
              {children}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
