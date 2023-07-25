import axios from "axios";
import Swal from "sweetalert2";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response ?? "";
    console.log(error);
    if (status >= 400) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
    if (status == 201) {
      Swal.fire({
        icon: "success",
        text: error.response.data.message,
      });
    }
    if (status >= 500) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  }
);
