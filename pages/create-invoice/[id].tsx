import { useRouter } from 'next/router';
import NavBar from '../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../components/organisms/FormInvoiceStep1'
import Invoice from '../../components/organisms/Invoice'
import Sidebar from '../../components/organisms/Sidebar'
import { updateInvoices } from '../../services/user';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditInvoiceStep1() {
  const { query } = useRouter();

  const [alamat_perusahaan, setAlamat_perusahaan] = useState('')
  const [no_invoice, setNo_invoice] = useState('')
  const [company, setCompany] = useState('')
  const [invoice_date, setInvoice_date] = useState('')
  const [due_date, setDue_date] = useState('')

  const router = useRouter();

  useEffect(() => {
    const dataLocal = localStorage.getItem('step-1')
    const data = JSON.parse(dataLocal)
    setAlamat_perusahaan(data.alamat_perusahaan)
    setNo_invoice(data.no_invoice)
    setCompany(data.company)
    setInvoice_date(data.invoice_date)
    setDue_date(data.due_date)
  }, [])

  const onSubmit = async () => {
    const form = {
      alamat_perusahaan,
      no_invoice,
      company,
      invoice_date,
      due_date,
    }

    const response = await updateInvoices(form, query.id)
    if (response.error) {
      toast.error(response.message)
    } else {
      toast.error("Berhasil ubah data")
      localStorage.setItem('step-1', JSON.stringify(form))
      router.push(`/create-invoice/step-2/${query.id}`)
    }
    // console.log("data :", response.data.data)
  }

  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
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
          {/* Invoice */}
          <Invoice
            alamat_perusahaan={alamat_perusahaan}
            no_invoice={no_invoice}
            company={company}
            invoice_date={invoice_date}
            due_date={due_date}
          />
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