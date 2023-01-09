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
  invoice_date: Date;
  due_date: Date;
  payment_instruction: string; 
}