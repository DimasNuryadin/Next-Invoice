import { useRouter } from 'next/router';
import NavBar from '../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../components/organisms/FormInvoiceStep1'
import Invoice from '../../components/organisms/Invoice'
import Sidebar from '../../components/organisms/Sidebar'
import { createInvoices } from '../../services/user';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateInvoice() {
  const [alamat_perusahaan, setAlamat_perusahaan] = useState('')
  const [no_invoice, setNo_invoice] = useState('')
  const [company, setCompany] = useState('')
  const [invoice_date, setInvoice_date] = useState('')
  const [due_date, setDue_date] = useState('')

  const router = useRouter();

  // console.log("Form : ", form)

  const onSubmit = async () => {
    const form = {
      alamat_perusahaan,
      no_invoice,
      company,
      invoice_date,
      due_date,
    }

    if (!alamat_perusahaan || !no_invoice || !company || !invoice_date || !due_date) {
      toast.error("Data tidak boleh kosong");
    } else {
      const response = await createInvoices(form)
      // console.log("data :", response.data.data)
      const id = response.data.data.id;
      localStorage.setItem('step-1', JSON.stringify(response.data.data))
      router.push(`/create-invoice/step-2/${id}`)
    }
  }

  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <div className='col-6 create-invoice'>
            <h2 className='title-2'>CREATE INVOICES</h2>
            <FormInvoiceStep1
              alamat_perusahaan={alamat_perusahaan}
              no_invoice={no_invoice}
              company={company}
              invoice_date={invoice_date}
              due_date={due_date}
              setAlamat_perusahaan={setAlamat_perusahaan}
              setNo_invoice={setNo_invoice}
              setCompany={setCompany}
              setInvoice_date={setInvoice_date}
              setDue_date={setDue_date}
              onSubmit={onSubmit}
            />
          </div>
          {/* Invoice */}
          <div className="col-6">
            <Invoice
              alamat_perusahaan={alamat_perusahaan}
              no_invoice={no_invoice}
              company={company}
              invoice_date={invoice_date}
              due_date={due_date}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

// Server side rendering
export async function getServerSideProps({ req }) {
  const { token } = req.cookies
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  // console.log("token: ", token)
  return {
    props: {
      user: {},
    }
  }
}