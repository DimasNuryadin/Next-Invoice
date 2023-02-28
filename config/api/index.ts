import axios, { AxiosRequestConfig } from "axios";

export default async function callApi({url, method, data}: AxiosRequestConfig) {
  const response = await axios({
    url: url,
    method: method,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2Nzc1OTExNjksImV4cCI6MTY3NzYxMjc2OX0.EhGaCAeGosLeemfXOPTLWmZVkrpOWXmtt8eYYni2KYc'
    }
  }).catch((err) => err.response);

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
    data: response.data
  }
  return res;
}