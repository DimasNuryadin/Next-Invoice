import NavBar from '../../components/molecules/NavBar'
import Sidebar from '../../components/organisms/Sidebar'
import { useCallback, useEffect, useState } from 'react';
import InvoiceItem from '../../components/molecules/InvoiceItem';
import { getAllInvoices, deleteDescription, deleteDownPayment, deleteInvoices } from '../../services/user';
import { InvoicesListTypes } from '../../services/data-types';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';

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
            getAllInvoice();
          }
        }
      }
    })
  }

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
                  onClick={() => onDelete(item.id)}
                />
              )
            })}
          </div>

          <div className="col-1 line-2">
            <div></div>
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