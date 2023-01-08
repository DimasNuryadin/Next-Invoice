import axios from 'axios';
const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function getAllInvoices() {
  const URL = 'invoices'

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data
}

export async function getInvoices(id) {
  const URL = `invoices/${id}`

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data
}

export async function getDescription() {
  return null;
}