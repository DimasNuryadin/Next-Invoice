import NavBar from '../components/molecules/NavBar'
import FormInvoice1 from '../components/organisms/FormInvoice1'
import Invoice from '../components/organisms/Invoice'
import Sidebar from '../components/organisms/Sidebar'

export default function CreateInvoice1() {
  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 create-invoice'>
          <FormInvoice1 />
          <div className="col-1 line-1">
            <div></div>
            <div></div>
            <br />
          </div>

          {/* Invoice */}
          <Invoice />
        </div>
      </div>
    </div>
  )
}
