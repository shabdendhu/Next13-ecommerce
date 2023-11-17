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

export const apiGet = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiPost = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiPut = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const apiDelete = async (url, id) => {
  try {
    const response = await axiosInstance.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const apiGetById = async (url, id) => {
  try {
    const response = await axiosInstance.get(url + "/" + id);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
// Add more methods for other HTTP verbs (PUT, DELETE, etc.) if needed

const handleApiError = (error) => {
  // Handle API errors here, e.g., show a notification or redirect to an error page
  console.error("API Error:", error);
  throw error; // Rethrow the error to propagate it to the calling code
};
