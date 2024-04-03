export interface InvoicesListTypes {
  id: number;
  company: string,
  latest_update: string,
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface FormInvoicesStep1 {
  alamat_perusahaan: string;
  no_invoice: string;
  company: string;
  invoice_date: string;
  due_date: string;
}

export interface FormInvoicesStep2 {
  payment_instruction: string;
  discount: number;
  tax: number;
  shipping: number;
}

export interface FormDescription {
  id_invoices: number;
  description: string;
  qty: number;
  rate: number;
}

export interface FormDownPayment {
  id_invoices: number;
  date: string;
  rate: number;
}

export interface FormSendEmail {
  nama: string;
  phone: string;
  email: string;
  message: string;
}