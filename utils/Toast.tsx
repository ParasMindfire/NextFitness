"use client"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//toast component taking message and type as argument
export const showToast = (message: string, type: "success" | "error") => {
  toast(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    type: type,
    style: { marginTop: "60px" }
  });
};
