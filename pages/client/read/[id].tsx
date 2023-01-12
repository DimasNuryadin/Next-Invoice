import { useRouter } from 'next/router'
import NavBar from '../../../components/molecules/NavBar'
import Invoice from '../../../components/organisms/Invoice'
import Sidebar from '../../../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import { getDescription, getDownPayment, getInvoices } from '../../../services/user'
import InvoicePDF from '../../../components/organisms/InvoicePDF';

export default function Read() {
  const { query, isReady } = useRouter();
  const [dataInvoice, setDataInvoice] = useState({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: new Date(),
    due_date: new Date(),
    payment_instruction: '',
    discount: 0,
    tax: 0,
    shipping: 0,
  })

  const [dataDescription, setDataDescription] = useState([])
  const [dataDownPayment, setDataDownPayment] = useState([]);

  const [dataSubtotal, setDataSubtotal] = useState(0);
  const [dataSisa, setDataSisa] = useState(0)

  // Callback
  const getInvoiceAPI = useCallback(async (id: any) => {
    const dataInvoices = await getInvoices(id);
    const dataDescriptions = await getDescription(id);
    const dataDownPayments = await getDownPayment(id);

    const destDescription = dataDescriptions.data.data
    const destDownPayment = dataDownPayments.data.data

    setDataInvoice(dataInvoices)
    setDataDescription(destDescription);
    setDataDownPayment(destDownPayment);

    function jumlahArray(total: number, value: number) {
      return total + value;
    }

    if (destDescription.length > 0) {
      // Subtotal
      let subTotal1 = destDescription.map((x: any) => x.qty * x.rate)
      // console.log("Amount :", subTotal1)
      const subTotal = subTotal1.reduce(jumlahArray)
      setDataSubtotal(subTotal)

      // Total
      let totalDisc = subTotal * (dataInvoices.discount / 100);
      let totalTax = subTotal * (dataInvoices.tax / 100);
      let totalShipping = dataInvoices.shipping;
      let total = subTotal - totalDisc + totalTax + totalShipping;

      if (destDownPayment.length > 0) {
        console.log(destDownPayment)
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
  }, [])

  useEffect(() => {
    if (isReady) {
      // console.log('Router sudah tersedia', query)
      getInvoiceAPI(query.id)
    } else {
      // console.log('router tidak tersedia')
    }
  }, [query, isReady, getInvoiceAPI])

  return (
    <div className='invoice-page'>
      <Sidebar url="client" />
      <div className='dashboard'>
        <NavBar />
        <div className='mt-5 pt-4'>
          <InvoicePDF
            desc={dataDescription}
            dp={dataDownPayment}
            subTotal={dataSubtotal}
            sisa={dataSisa}
            alamat_perusahaan={dataInvoice.alamat_perusahaan}
            no_invoice={dataInvoice.no_invoice}
            company={dataInvoice.company}
            invoice_date={dataInvoice.invoice_date}
            due_date={dataInvoice.due_date}
            discount={dataInvoice.discount}
            tax={dataInvoice.tax}
            shipping={dataInvoice.shipping}
            payment_instruction={dataInvoice.payment_instruction}
          />
        </div>
      </div>
    </div>
  )
}