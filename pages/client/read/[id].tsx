import { useRouter } from 'next/router'
import NavBar from '../../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../../components/organisms/FormInvoiceStep1'
import Invoice from '../../../components/organisms/Invoice'
import Sidebar from '../../../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import { getInvoices } from '../../../services/user'

export default function Read() {
  const { query, isReady } = useRouter();
  const [dataInvoice, setDataInvoice] = useState({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: '',
    due_date: '',
  })

  // Callback
  const getInvoiceAPI = useCallback(async (id) => {
    const data = await getInvoices(id);
    console.log('data', data)
    setDataInvoice(data)
  }, [])

  useEffect(() => {
    if (isReady) {
      console.log('Router sudah tersedia', query)
      getInvoiceAPI(query.id)
    } else {
      console.log('router tidak tersedia')
    }
  }, [query, isReady])

  return (
    <div className='invoice-page'>
      <Sidebar url="client" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <FormInvoiceStep1 />

          {/* Invoice */}
          <Invoice
            alamat_perusahaan={dataInvoice.alamat_perusahaan}
            no_invoice={dataInvoice.no_invoice}
            company={dataInvoice.company}
            invoice_date={dataInvoice.invoice_date}
            due_date={dataInvoice.due_date}
          />
        </div>
      </div>
    </div>
  )
}