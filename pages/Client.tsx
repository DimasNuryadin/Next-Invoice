import NavBar from '../components/molecules/NavBar'
import Sidebar from '../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import InvoiceItem from '../components/molecules/InvoiceItem';
import { getInvoices } from '../services/user';

export default function Clients() {
  const [invoicesList, setInvoicesList] = useState<any[]>([])

  // Callback
  const getAllInvoices = useCallback(async () => {
    const data = await getInvoices()
    setInvoicesList(data);
    console.log('cek')
  }, [])

  useEffect(() => {
    getAllInvoices();
  }, [getAllInvoices]);

  return (
    <div className='invoice-page'>
      <Sidebar url="clients" />
      <div className='dashboard'>
        <NavBar />

        <div className='row mt-5 client'>
          <div className='col-11'>
            <h2 className='title-2'>CLIENTS</h2>

            {/* CLient List */}
            {invoicesList.map(item => {
              return (
                <InvoiceItem key={item.id} company={item.company} date={item.latest_update} />
              )
            })}
          </div>

          <div className="col-1 line-2">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
