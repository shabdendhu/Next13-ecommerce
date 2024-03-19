// api.js

import axios from "axios";

const API_URL = "https://your-backend-api-url.com"; // Replace with your actual API URL
const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need, such as authentication tokens
  },
});

export const apiGet = async (url, params = {}, openSnackbar) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error, openSnackbar);
  }
};

export const apiPost = async (url, data = {}, openSnackbar) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error, openSnackbar);
  }
};

export const apiPut = async (url, data = {}, openSnackbar) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error, openSnackbar);
    // return error;
  }
};

export const apiDelete = async (url, id, openSnackbar) => {
  try {
    const response = await axiosInstance.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, openSnackbar);
  }
};

export const apiGetById = async (url, id, openSnackbar) => {
  try {
    const response = await axiosInstance.get(url + "/" + id);
    return response.data;
  } catch (error) {
    handleApiError(error, openSnackbar);
  }
};
// Add more methods for other HTTP verbs (PUT, DELETE, etc.) if needed

const handleApiError = (error, openSnackbar) => {
  // Handle API errors here, e.g., show a notification or redirect to an error page
  console.error("API Error:", error);
  if (error.response && error.response.data) {
    console.error("API Error:", error.response.data.error);
    return openSnackbar(
      "error",
      error.response.data.error || "someting went wrong"
    );
  }
  openSnackbar("error", error.message || "someting went wrong");
  // throw error; // Rethrow the error to propagate it to the calling code
};
