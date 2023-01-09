import Button from "../../atoms/Button";
interface FormInvoiceStep1Props {
  alamat_perusahaan: string,
  no_invoice: string,
  company: string,
  invoice_date: Date,
  due_date: Date,
  setAlamat_perusahaan: (alamat_perusahaan: string) => void;
  setNo_invoice: (no_invoice: string) => void;
  setCompany: (company: string) => void;
  setInvoice_date: (invoice_date: Date) => void;
  setDue_date: (due_date: Date) => void;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FormInvoiceStep1(props: Partial<FormInvoiceStep1Props>) {
  const {
    alamat_perusahaan,
    no_invoice,
    company,
    invoice_date,
    due_date,
    setAlamat_perusahaan,
    setNo_invoice,
    setCompany,
    setInvoice_date,
    setDue_date,
    onSubmit
  } = props;

  return (
    <div className='col-6 create-invoice'>
      <h2 className='title-2'>CREATE INVOICES</h2>
      <div className="mb-3 mt-5">
        <label htmlFor="Alamat Perusahaan" className="form-label label">Alamat Perusahaan</label>
        <textarea
          className="form-control"
          id="Alamat Perusahaan"
          rows={3}
          value={alamat_perusahaan}
          onChange={(event) => setAlamat_perusahaan(event.target.value)}>
        </textarea>
        <br />
        <label htmlFor="Invoice No" className="form-label label">Invoice No</label>
        <input
          className="form-control"
          type="text"
          id="Invoice No"
          value={no_invoice}
          onChange={(event) => setNo_invoice(event.target.value)}
        />
        <br />
        <label htmlFor="Bill to" className="form-label label">Bill to</label>
        <input
          className="form-control"
          type="text"
          id="Bill to"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="Invoice Date" className="form-label label">Invoice Date</label>
            <input
              className="form-control"
              type="date"
              id="Invoice Date"
              value={invoice_date}
              onChange={(event) => setInvoice_date(event.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="Due Date" className="form-label label">Due Date</label>
            <input
              className="form-control"
              type="date"
              id="Due Date"
              value={due_date}
              onChange={(event) => setDue_date(event.target.value)}
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
