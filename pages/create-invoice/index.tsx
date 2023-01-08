import NavBar from '../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../components/organisms/FormInvoiceStep1'
import Invoice from '../../components/organisms/Invoice'
import Sidebar from '../../components/organisms/Sidebar'

export default function CreateInvoice1() {

  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <FormInvoiceStep1 />

          {/* Invoice */}
          <Invoice />
        </div>
      </div>
    </div>
  )
}
