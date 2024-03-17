"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SnackbarContext } from "@/hooks/useSnakBar";

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  //'success' | 'info' | 'warning' | 'error'
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openSnackbar = (type = "info", message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSeverity(type);
  };

  const memoizedValue = useMemo(() => ({ openSnackbar }), [openSnackbar]); // Memoize the value

  return (
    <SnackbarContext.Provider value={memoizedValue}>
      {children}
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={severity} // Change severity as needed
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
