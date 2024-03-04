import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const MyReviewsList = () => {
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState([
    { id: 1, user: "User1", rating: 4, comment: "Great product!" },
    { id: 2, user: "User2", rating: 5, comment: "Excellent quality." },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingReview(null);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setOpen(true);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  return (
    <div>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemText
              primary={`${review.user} - Rating: ${review.rating}`}
              secondary={review.comment}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditReview(review)} edge="end">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteReview(review.id)}
                edge="end"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Name"
            fullWidth
            margin="normal"
            defaultValue={editingReview ? editingReview.user : ""}
            disabled
          />
          <TextField
            label="Rating"
            fullWidth
            margin="normal"
            defaultValue={editingReview ? editingReview.rating : ""}
            disabled
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            defaultValue={editingReview ? editingReview.comment : ""}
            disabled
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReviewsList;
