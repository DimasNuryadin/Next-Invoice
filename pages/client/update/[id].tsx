import { useRouter } from 'next/router';
import NavBar from '../../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../../components/organisms/FormInvoiceStep1'
import Invoice from '../../../components/organisms/Invoice'
import Sidebar from '../../../components/organisms/Sidebar'
import { getDescription, getDownPayment, getInvoices, updateInvoicesStep1 } from '../../../services/user';
import { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientEditInvoiceStep1() {
  const { query, isReady } = useRouter();
  const router = useRouter();

  // Invoices
  const [alamat_perusahaan, setAlamat_perusahaan] = useState('')
  const [no_invoice, setNo_invoice] = useState('')
  const [company, setCompany] = useState('')
  const [invoice_date, setInvoice_date] = useState(new Date)
  const [due_date, setDue_date] = useState(new Date)
  const [payment_instruction, setPayment_instruction] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('')
  const [shipping, setShipping] = useState('');

  const [description, setDescription] = useState([])
  const [down_payment, setDown_payment] = useState([])

  const getInvoiceAPI = useCallback(async (id: any) => {
    // Get Invoices
    const dataInvoices = await getInvoices(id)
    setAlamat_perusahaan(dataInvoices.alamat_perusahaan)
    setNo_invoice(dataInvoices.no_invoice)
    setCompany(dataInvoices.company)
    setInvoice_date(dataInvoices.invoice_date)
    setDue_date(dataInvoices.due_date)
    setPayment_instruction(dataInvoices.payment_instruction)
    setDiscount(dataInvoices.discount)
    setTax(dataInvoices.tax)
    setShipping(dataInvoices.shipping);

    // Get Description & Down Payment
    const dataDescriptions = await getDescription(id)
    const dataDownPayments = await getDownPayment(id);

    setDescription(dataDescriptions.data.data)
    setDown_payment(dataDownPayments.data.data)
  }, [])

  useEffect(() => {
    if (isReady) {
      getInvoiceAPI(query.id)
    }
  }, [query, isReady, getInvoiceAPI])

  const onSubmit = async () => {
    const form = {
      alamat_perusahaan,
      no_invoice,
      company,
      invoice_date,
      due_date,
      payment_instruction,
    }

    const toLocal = {
      alamat_perusahaan,
      no_invoice,
      company,
      invoice_date,
      due_date,
      payment_instruction,
      discount,
      tax,
      shipping,
    }

    const response = await updateInvoicesStep1(form, query.id)
    if (response.error) {
      toast.error(response.message)
    } else {
      toast.success("Berhasil ubah data")
      localStorage.setItem('step-1', JSON.stringify(toLocal))
      router.push(`/client/update/step-2/${query.id}`)
    }

    // console.log("data :", response.data.data)
  }

  return (
    <div className='invoice-page'>
      <Sidebar url="client" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <div className='col-6 create-invoice'>
            <h2 className='title-2'>EDIT INVOICES</h2>
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
              payment_instruction={payment_instruction}
              desc={description}
              dp={down_payment}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

// Server side rendering
export async function getServerSideProps({ req }: any) {
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