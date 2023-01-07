import NavBar from '../components/molecules/NavBar'
import FormInvoice1 from '../components/organisms/FormInvoice1'
import Invoice from '../components/organisms/Invoice'
import Sidebar from '../components/organisms/Sidebar'
import axios from 'axios'

export default function CreateInvoice1() {

  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <FormInvoice1 />

          {/* Invoice */}
          <Invoice />
        </div>
      </div>
    </div>
  )
}
