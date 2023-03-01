import axios from 'axios';
import callApi from '../config/api';
import { FormDescription, FormDownPayment, FormInvoicesStep1, FormInvoicesStep2, FormSendEmail } from './data-types';
const ROOT_API = process.env.NEXT_PUBLIC_API;
import Cookies from 'js-cookie';

export async function getAllInvoices() {
  const url = `${ROOT_API}/invoices`;

  return callApi({
    url,
    method: 'GET',
    token: true,
  })
}

export async function getInvoices(id: any) {
  // Cara lama Req API
  let headers = {};
  const tokenCookies = Cookies.get('token');
  if (tokenCookies) {
    const jwtToken = atob(tokenCookies);
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }
  }

  const config = {
    headers,
  }
  const URL = `invoices/${id}`
  const response = await axios.get(`${ROOT_API}/${URL}`, config);
  const axiosResponse = response.data;
  return axiosResponse.data
}

export async function getInvoicesCompany(company: any) {
  // cara baru Req API
  const url = `${ROOT_API}/invoices/company/${company}`;

  return callApi({
    url,
    method: 'GET',
    data: company,
    token: true,
  })
}

export async function createInvoices(data: FormInvoicesStep1) {
  const url = `${ROOT_API}/invoices`

  return callApi({
    url,
    method: 'POST',
    data: data,
    token: true,
  })
}

export async function updateInvoicesStep1(data: FormInvoicesStep1, id: any) {
  const url = `${ROOT_API}/invoices/step-1/${id}`

  return callApi({
    url,
    method: 'PATCH',
    data: data,
    token: true,
  })
}

export async function updateInvoicesStep2(data: FormInvoicesStep2, id: any) {
  const url = `${ROOT_API}/invoices/step-2/${id}`

  return callApi({
    url,
    method: 'PATCH',
    data: data,
    token: true,
  })
}

export async function deleteInvoices(id_invoices: any) {
  const url = `${ROOT_API}/invoices/${id_invoices}`

  return callApi({
    url,
    method: 'DELETE',
    token: true,
  })
}


// Descriptions
export async function getDescription(id: any) {
  const url = `${ROOT_API}/descriptions/${id}`

  return callApi({
    url,
    method: 'GET',
    token: true,
  })
}

export async function createDescription(data: FormDescription) {
  const url = `${ROOT_API}/descriptions`;

  return callApi({
    url,
    method: 'POST',
    data: data,
    token: true,
  })
}

export async function deleteDescription(id_invoices: any) {
  const url = `${ROOT_API}/descriptions/${id_invoices}`

  return callApi({
    url,
    method: 'DELETE',
    token: true,
  })
}


// Down Payments
export async function getDownPayment(id: any) {
  const url = `${ROOT_API}/down_payments/${id}`;

  return callApi({
    url,
    method: 'GET',
    token: true,
  })
}

export async function createDownPayment(data: FormDownPayment) {
  const url = `${ROOT_API}/down_payments`

  return callApi({
    url,
    method: 'POST',
    data: data,
    token: true,
  })
}

export async function deleteDownPayment(id_invoices: any) {
  const url = `${ROOT_API}/down_payments/${id_invoices}`

  return callApi({
    url,
    method: 'DELETE',
    token: true,
  })
}

export async function sendEmail(data: FormSendEmail) {
  const url = `${ROOT_API}/users/send_email`;

  return callApi({
    url,
    method: 'POST',
    data: data,
    token: true,
  })
}