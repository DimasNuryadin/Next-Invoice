import axios from "axios";
import { LoginTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function setLogin(data: LoginTypes) {
  const URL = "users/login";

  const response = await axios.post(`${ROOT_API}/${URL}`, data).catch((err) => err.response)
  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null
    }
    return res
  }
  
  const res = {
    error: false,
    message: 'success',
    data: response.data.token
  }
  return res;
}