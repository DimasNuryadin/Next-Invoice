import NavBar from '../../components/molecules/NavBar'
import Sidebar from '../../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import InvoiceItem from '../../components/molecules/InvoiceItem';
import { getAllInvoices } from '../../services/user';
import { InvoicesListTypes } from '../../services/data-types';

export default function Clients() {
  const [invoicesList, setInvoicesList] = useState([])

  // Callback
  const getAllInvoice = useCallback(async () => {
    const data = await getAllInvoices()
    setInvoicesList(data);
  }, [])

  useEffect(() => {
    getAllInvoice();
  }, [getAllInvoice]);

  return (
    <div className='invoice-page'>
      <Sidebar url="client" />
      <div className='dashboard'>
        <NavBar />

        <div className='row mt-5 client'>
          <div className='col-11'>
            <h2 className='title-2'>CLIENTS</h2>

            {/* CLient List */}
            {invoicesList.map((item: InvoicesListTypes) => {
              return (
                <InvoiceItem
                  key={item.id}
                  company={item.company}
                  date={item.latest_update}
                  id={item.id}
                />
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
