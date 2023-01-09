import axios from 'axios';
import callApi from '../config/api';
import { FormDescription, FormDownPayment, FormInvoicesStep1, FormInvoicesStep2 } from './data-types';
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

export async function updateInvoicesStep1(data: FormInvoicesStep1, id: any) {
  const url = `${ROOT_API}/invoices/step-1/${id}`

  return callApi({
    url,
    method: 'PATCH',
    data: data,
  })
}

export async function updateInvoicesStep2(data: FormInvoicesStep2, id: any) {
  const url = `${ROOT_API}/invoices/step-2/${id}`

  return callApi({
    url,
    method: 'PATCH',
    data: data,
  })
}

export async function getDescription() {
  return null;
}

export async function createDescription(data: FormDescription) {
  const url = `${ROOT_API}/descriptions`;

  return callApi({
    url,
    method: 'POST',
    data: data
  })
}

export async function createDownPayment(data: FormDownPayment) {
  const url = `${ROOT_API}/down_payments`

  return callApi({
    url,
    method: 'POST',
    data: data
  })
}