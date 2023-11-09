import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import ImageUpload from "@/components/base/ImageUpload";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category_ids: [],
    brand: "",
    stock_quantity: 0,
    images: [],
    attributes: [],
    ratings: {
      average: 0,
      count: 0,
    },
    reviews: [],
    created_at: new Date(),
    updated_at: new Date(),
    sku: "",
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    tags: [],
    availability: "",
    shipping_info: {
      free_shipping: false,
      estimated_delivery: "",
    },
    related_products: [],
    warranty: {
      type: "",
      duration: 0,
      details: "",
    },
  });

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleImageChange = (images) => {
    setProduct({ ...product, images });
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...product.attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [field]: value };
    setProduct({ ...product, attributes: updatedAttributes });
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...product.reviews];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setProduct({ ...product, reviews: updatedReviews });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        style={{
          border: "1px solid red",
          maxHeight: "100%",
        }}
      >
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Description"
            fullWidth
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={product.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Brand"
            fullWidth
            value={product.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Stock Quantity"
            type="number"
            fullWidth
            value={product.stock_quantity}
            onChange={(e) => handleChange("stock_quantity", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Sku"
            fullWidth
            value={product.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Weight"
            type="number"
            fullWidth
            value={product.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Length"
            type="number"
            fullWidth
            value={product.dimensions.length}
            onChange={(e) =>
              handleChange("dimensions", {
                ...product.dimensions,
                length: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Width"
            type="number"
            fullWidth
            value={product.dimensions.width}
            onChange={(e) =>
              handleChange("dimensions", {
                ...product.dimensions,
                width: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Height"
            type="number"
            fullWidth
            value={product.dimensions.height}
            onChange={(e) =>
              handleChange("dimensions", {
                ...product.dimensions,
                height: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tags"
            fullWidth
            value={product.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Availability"
            fullWidth
            value={product.availability}
            onChange={(e) => handleChange("availability", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={product.category_ids}
              onChange={(e) => handleChange("category_ids", e.target.value)}
              renderValue={(selected) => selected.join(",")}
            >
              {/* Render the category options here */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={product.shipping_info.free_shipping}
                onChange={(e) =>
                  handleChange("shipping_info", {
                    ...product.shipping_info,
                    free_shipping: e.target.checked,
                  })
                }
              />
            }
            label="Free Shipping"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Estimated Delivery"
            fullWidth
            value={product.shipping_info.estimated_delivery}
            onChange={(e) =>
              handleChange("shipping_info", {
                ...product.shipping_info,
                estimated_delivery: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ImageUpload images={product.images} setImages={handleImageChange} />
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="h6">Attributes</Typography>
          {product.attributes.map((attribute, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Value"
                  fullWidth
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "10px",
            }}
            onClick={() =>
              setProduct({
                ...product,
                attributes: [...product.attributes, { name: "", value: "" }],
              })
            }
          >
            Add Attribute
          </Button>
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="h6">Attributes</Typography>
          {product.attributes.map((attribute, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              style={{
                marginTop: "10px",
              }}
            >
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Value"
                  fullWidth
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    const updatedAttributes = [...product.attributes];
                    updatedAttributes.splice(index, 1);
                    setProduct({ ...product, attributes: updatedAttributes });
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "10px",
            }}
            onClick={() =>
              setProduct({
                ...product,
                attributes: [...product.attributes, { name: "", value: "" }],
              })
            }
          >
            Add Attribute
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Ratings</Typography>
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "5px",
            }}
          >
            <Grid item xs={6}>
              <TextField
                label="Average"
                type="number"
                fullWidth
                value={product.ratings.average}
                onChange={(e) =>
                  handleChange("ratings", {
                    ...product.ratings,
                    average: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Count"
                type="number"
                fullWidth
                value={product.ratings.count}
                onChange={(e) =>
                  handleChange("ratings", {
                    ...product.ratings,
                    count: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Reviews</Typography>
          {product.reviews.map((review, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              style={{
                marginTop: "3px",
              }}
            >
              <Grid item xs={4}>
                <TextField
                  label="User"
                  fullWidth
                  value={review.user}
                  onChange={(e) =>
                    handleReviewChange(index, "user", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Rating"
                  type="number"
                  fullWidth
                  value={review.rating}
                  onChange={(e) =>
                    handleReviewChange(index, "rating", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Comment"
                  fullWidth
                  value={review.comment}
                  onChange={(e) =>
                    handleReviewChange(index, "comment", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}
          <Button
            style={{
              marginTop: "10px",
            }}
            variant="outlined"
            color="primary"
            onClick={() =>
              setProduct({
                ...product,
                reviews: [
                  ...product.reviews,
                  { user: "", rating: 0, comment: "" },
                ],
              })
            }
          >
            Add Review
          </Button>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default ProductForm;
