// context/MyContext.js
"use client";
import { createContext, useState, useContext } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [myState, setMyState] = useState({ openOtpModal: false });

  const updateState = (newState) => {
    setMyState(newState);
  };

  return (
    <MyContext.Provider value={{ myState, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};

export { MyProvider, useMyContext };
