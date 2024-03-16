// ReviewManagement.js

import { apiDelete, apiGet, apiPost, apiPut } from "@/helpers/api";
import { useSnackbar } from "@/hooks/useSnakBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const ReviewManagement = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { openSnackbar } = useSnackbar();
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    user: "", // User's name
    rating: 0, // Rating value
    reviewText: "", // Review text
  });

  const getReviews = async () => {
    try {
      const reviewRes = await apiGet(
        `/api/reviews?order=${orderId}`,
        {},
        openSnackbar
      );
      setReviews(reviewRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingReview(null);
    // Reset form data on close
    setFormData({
      user: "",
      rating: 0,
      reviewText: "",
    });
  };

  const handleAddEditReview = async () => {
    try {
      const reviewData = {
        user: formData.user,
        rating: formData.rating,
        reviewText: formData.reviewText,
      };

      if (editingReview) {
        // Edit existing review
        await apiPut(
          `/api/reviews/${editingReview._id}`,
          reviewData,
          openSnackbar
        );
      } else {
        // Add new review
        await apiPost(
          "/api/reviews",
          { ...reviewData, order: orderId },
          openSnackbar
        );
      }

      getReviews();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setFormData({
      user: review.user || "",
      rating: review.rating || 0,
      reviewText: review.reviewText || "",
    });
    setOpen(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await apiDelete(`/api/reviews`, reviewId, openSnackbar);
      getReviews();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [orderId]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add Review
      </Button>

      {/* Add/Edit Review Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Your Name"
            fullWidth
            margin="normal"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          />
          <Rating
            name="rating"
            value={formData.rating}
            onChange={(event, newValue) =>
              setFormData({ ...formData, rating: newValue })
            }
          />
          <TextField
            label="Review"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.reviewText}
            onChange={(e) =>
              setFormData({ ...formData, reviewText: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEditReview}
          >
            {editingReview ? "Edit Review" : "Add Review"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Display Reviews */}
      {reviews.map((review) => (
        <div key={review._id}>
          <div>{`User: ${review.user}, Rating: ${review.rating}`}</div>
          <div>{`Review: ${review.reviewText}`}</div>
          <Button onClick={() => handleEditReview(review)}>Edit</Button>
          <Button onClick={() => handleDeleteReview(review._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default ReviewManagement;
