"use client";
import React from "react";
import BasketProduct from "@/components/sections/Basket";
import { useSelector } from "react-redux";
const Basket = () => {
  const basket = useSelector((state: any) => state.basket);
  return <BasketProduct basket={basket} />;
};

export default Basket;
