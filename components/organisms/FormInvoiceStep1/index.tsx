import Link from "next/link";
import Button from "../../atoms/Button";
interface FormInvoiceStep1Props {
  form: FormObject;
  setForm: object;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

interface FormObject {
  alamat_perusahaan: string,
  no_invoice: string,
  company: string,
  invoice_date: string,
  due_date: string
}

export default function FormInvoiceStep1(props: FormInvoiceStep1Props) {
  const { form, setForm, onSubmit } = props;

  return (
    <div className='col-6 create-invoice'>
      <h2 className='title-2'>CREATE INVOICES</h2>
      <div className="mb-3 mt-5">
        <label htmlFor="Alamat Perusahaan" className="form-label label">Alamat Perusahaan</label>
        <textarea
          className="form-control"
          id="Alamat Perusahaan"
          rows={3}
          value={form.alamat_perusahaan}
          onChange={(event) => setForm('alamat_perusahaan', event.target.value)}>
        </textarea>
        <br />
        <label htmlFor="Invoice No" className="form-label label">Invoice No</label>
        <input
          className="form-control"
          type="text"
          id="Invoice No"
          value={form.no_invoice}
          onChange={(event) => setForm('no_invoice', event.target.value)}
        />
        <br />
        <label htmlFor="Bill to" className="form-label label">Bill to</label>
        <input
          className="form-control"
          type="text"
          id="Bill to"
          value={form.company}
          onChange={(event) => setForm('company', event.target.value)}
        />
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="Invoice Date" className="form-label label">Invoice Date</label>
            <input
              className="form-control"
              type="date"
              id="Invoice Date"
              value={form.invoice_date}
              onChange={(event) => setForm('invoice_date', event.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="Due Date" className="form-label label">Due Date</label>
            <input
              className="form-control"
              type="date"
              id="Due Date"
              value={form.due_date}
              onChange={(event) => setForm('due_date', event.target.value)}
            />
          </div>
        </div>

        {/* Button Next Page */}
        <div className='mt-4 float-end'>
          <Button buttonType="btn-primary" label="Next Page" onClick={onSubmit} />
        </div>
      </div>
      <br /><br />
    </div>
  )
}
