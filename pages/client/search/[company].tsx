import NavBar from '../../../components/molecules/NavBar'
import Sidebar from '../../../components/organisms/Sidebar'
import { useCallback, useEffect, useRef, useState } from 'react';
import InvoiceItem from '../../../components/molecules/InvoiceItem';
import { deleteDescription, deleteDownPayment, deleteInvoices, getDescription, getDownPayment, getInvoices, getInvoicesCompany } from '../../../services/user';
import { InvoicesListTypes } from '../../../services/data-types';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import InvoicePDF from '../../../components/organisms/InvoicePDF';
import { useReactToPrint } from 'react-to-print';
import Loading from '../../../components/molecules/Loading';

export default function ClientsSearch() {
  const { query, isReady } = useRouter();

  const [invoicesList, setInvoicesList] = useState([])
  const [invoices, setInvoices] = useState({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: '',
    due_date: '',
    discount: 0,
    tax: 0,
    shipping: 0,
    payment_instruction: '',
  });
  const [dataDescription, setDataDescription] = useState([])
  const [dataDownPayment, setDataDownPayment] = useState([]);

  const [dataSubtotal, setDataSubtotal] = useState(0);
  const [dataTotal, setDataTotal] = useState(0);
  const [dataSisa, setDataSisa] = useState(0)

  const [isPrinting, setIsPrinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Callback
  const getAllInvoice = useCallback(async (company: any) => {
    const data = await getInvoicesCompany(company)
    setInvoicesList(data.data.data)
  }, [])

  useEffect(() => {
    if (isReady) {
      getAllInvoice(query.company)
    } else {
      console.log("data belum dapat")
    }

    if (isPrinting) {
      handlePrint()
    }

  }, [query, isReady, getAllInvoice, isPrinting]);

  function jumlahArray(total: number, value: number) {
    return total + value;
  }

  // Print PDF
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      setIsPrinting(false);
      setIsLoading(false);
    },
    documentTitle: `Invoice`,
  })

  const onRead = async (id: any) => {
    setIsLoading(true);
    const invoice = await getInvoices(id);
    const description = await getDescription(id);
    const down_payment = await getDownPayment(id);

    const destDescription = description.data.data
    const destDownPayment = down_payment.data.data

    setInvoices(invoice);
    setDataDescription(destDescription);
    setDataDownPayment(destDownPayment);

    if (destDescription.length > 0) {
      setIsPrinting(true)
      // Subtotal
      let subTotal1 = destDescription.map((x: any) => x.qty * x.rate)
      // console.log("Amount :", subTotal1)
      const subTotal = subTotal1.reduce(jumlahArray)
      setDataSubtotal(subTotal)

      // Total
      let totalDisc = subTotal * (invoice.discount / 100);
      let totalTax = subTotal * (invoice.tax / 100);
      let totalShipping = invoice.shipping;
      let total = subTotal - totalDisc + totalTax + totalShipping;
      setDataTotal(total)

      if (destDownPayment.length > 0) {
        // console.log(destDownPayment)
        // Sisa
        let dpRate = destDownPayment.map((x: any) => Number(x.rate))
        let jumlahDP = dpRate.reduce(jumlahArray)
        let sisa = total - jumlahDP
        // console.log('Sisa : ', sisa)
        setDataSisa(sisa)
      } else {
        setDataSisa(subTotal)
      }
    }
  }

  const onDelete = (id: any) => {
    Swal.fire({
      title: 'Apakah yakin data akan dihapus?',
      text: "Data tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Hapus!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resInvoiceDelete = await deleteInvoices(id)
        const resDescDelete = await deleteDescription(id)
        const resDPDelete = await deleteDownPayment(id)

        if (resInvoiceDelete.error && resDescDelete.error) {
          toast.error(resInvoiceDelete.message)
          toast.error(resDescDelete.message)
        } else {
          if (resDPDelete.error) {
            toast.error(resDPDelete.message)
          } else {
            Swal.fire(
              'Dihapus',
              'Data sudah dihapus.',
              'success'
            )
            getAllInvoice(query.company);
          }
        }
      }
    })
  }

  return (
    <div className='invoice-page'>
      {isLoading && (
        <Loading />
      )}

      <Sidebar url="client" />
      <div className='dashboard'>
        <NavBar />

        <div className='row mt-5 client'>
          <div className='col-11'>
            <h2 className='title-2'>SEARCH</h2>

            {/* CLient List */}
            {invoicesList.map((item: InvoicesListTypes) => {
              return (
                <InvoiceItem
                  key={item.id}
                  company={item.company}
                  date={item.latest_update}
                  id={item.id}
                  onRead={() => onRead(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              )
            })}
          </div>

          <div className="col-1 line-2">
            <div></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <InvoicePDF
            desc={dataDescription}
            dp={dataDownPayment}
            subTotal={dataSubtotal}
            total={dataTotal}
            sisa={dataSisa}
            alamat_perusahaan={invoices.alamat_perusahaan}
            no_invoice={invoices.no_invoice}
            company={invoices.company}
            invoice_date={invoices.invoice_date}
            due_date={invoices.due_date}
            discount={invoices.discount}
            tax={invoices.tax}
            shipping={invoices.shipping}
            payment_instruction={invoices.payment_instruction}
          />
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