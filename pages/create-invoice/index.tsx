import { useRouter } from 'next/router';
import NavBar from '../../components/molecules/NavBar'
import FormInvoiceStep1 from '../../components/organisms/FormInvoiceStep1'
import Invoice from '../../components/organisms/Invoice'
import Sidebar from '../../components/organisms/Sidebar'
import { useForm } from '../../services/utils/useForm';
import moment from 'moment';

export default function CreateInvoice() {
  const [form, setForm] = useForm({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: new Date(),
    due_date: new Date()
  });

  const router = useRouter();

  // const today = new Date()
  // console.log(today.getDate())

  const onSubmit = () => {
    console.log("form :", form)
    router.push('/create-invoice/step-2')
  }

  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>
          <FormInvoiceStep1
            setForm={setForm}
            form={form}
            onSubmit={onSubmit}
          />
          {/* Invoice */}
          <Invoice
            alamat_perusahaan={form.alamat_perusahaan}
            no_invoice={form.no_invoice}
            company={form.company}
            invoice_date={moment(form.invoice_date).format('DD MMM YY')}
            due_date={moment(form.due_date).format('DD MMM YY')}
          />
        </div>
      </div>
    </div>
  )
}
