import axios from 'axios';
import callApi from '../config/api';
import { FormInvoicesStep1 } from './data-types';
const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function getAllInvoices() {
  const URL = 'invoices'

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data
}

export async function getInvoices(id: any) {
  const URL = `invoices/${id}`

  const response = await axios.get(`${ROOT_API}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data
}

export async function createInvoices(data: FormInvoicesStep1) {
  const url = `${ROOT_API}/invoices`

  return callApi({
    url,
    method: 'POST',
    data: data
  })
}

export async function updateInvoices(data: FormInvoicesStep1, id: any) {
  const url = `http://localhost:4000/invoices/${id}`

  return callApi({
    url,
    method: 'PATCH',
    data: data,
  })
}

export async function getDescription() {
  return null;
}