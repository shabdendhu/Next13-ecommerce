"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Newpassword from "@/components/sections/Newpassword";



export default function LoginPage() {
  return <Newpassword/>
}