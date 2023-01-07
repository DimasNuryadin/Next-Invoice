import axios from 'axios';

export async function getInvoices() {
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const URL = 'invoices'

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data
}

export async function getDescription() {
  return null;
}