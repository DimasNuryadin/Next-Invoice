import callApi from "../config/api";
import { LoginTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/users/login`;

  return callApi({
    url,
    method: 'POST',
    data,
  })
}