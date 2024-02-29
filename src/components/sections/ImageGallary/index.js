import React, { useState } from "react";
import { Modal, Grid, IconButton, Divider, Box } from "@mui/material";
// import ChevronRightIcon from "@mui/ico";
import styles from "./ImageGallery.module.scss"; // Import SCSS file for styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const ImageGallery = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="image-gallery-container">
      <IconButton onClick={handleModalOpen}>
        <img
          src={images[0]}
          alt="First Image"
          style={{
            maxHeight: "50px",
            borderRadius: "40px",
          }}
        />
      </IconButton>
      <Modal
        // className={styles.modal}
        onClose={handleModalClose}
        open={modalOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h1>Images</h1>
          <Divider />
          <Grid container gap={2} spacing={2} className={styles.grid}>
            {images.map((imageUrl, index) => (
              <Grid item key={index}>
                <img
                  src={imageUrl}
                  alt={`Image ${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: 10,
                    borderRadius: 5,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageGallery;
