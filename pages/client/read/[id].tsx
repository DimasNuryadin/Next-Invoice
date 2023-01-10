import { useRouter } from 'next/router'
import NavBar from '../../../components/molecules/NavBar'
import Invoice from '../../../components/organisms/Invoice'
import Sidebar from '../../../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import { getDescription, getDownPayment, getInvoices } from '../../../services/user'

export default function Read() {
  const { query, isReady } = useRouter();
  const [dataInvoice, setDataInvoice] = useState({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: new Date(),
    due_date: new Date(),
    payment_instruction: '',
  })

  const [dataDescription, setDataDescription] = useState([])
  const [dataDownPayment, setDataDownPayment] = useState([]);

  // Callback
  const getInvoiceAPI = useCallback(async (id: any) => {
    const dataInvoices = await getInvoices(id);
    const dataDescriptions = await getDescription(id);
    const dataDownPayments = await getDownPayment(id);

    setDataInvoice(dataInvoices)
    setDataDescription(dataDescriptions.data.data);
    setDataDownPayment(dataDownPayments.data.data);
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
          {/* Invoice */}
          <Invoice
            alamat_perusahaan={dataInvoice.alamat_perusahaan}
            no_invoice={dataInvoice.no_invoice}
            company={dataInvoice.company}
            invoice_date={dataInvoice.invoice_date}
            due_date={dataInvoice.due_date}
            payment_instruction={dataInvoice.payment_instruction}
            desc={dataDescription}
            dp={dataDownPayment}
          />
        </div>
      </div>
    </div>
  )
}