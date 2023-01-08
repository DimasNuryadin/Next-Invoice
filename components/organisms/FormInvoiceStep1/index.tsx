import Link from "next/link";
import Button from "../../atoms/Button";

export default function FormInvoiceStep1() {
  return (
    <div className='col-6 create-invoice'>
      <h2 className='title-2'>CREATE INVOICES</h2>
      <div className="mb-3 mt-5">
        <label htmlFor="Alamat Perusahaan" className="form-label label">Alamat Perusahaan</label>
        <textarea className="form-control" id="Alamat Perusahaan" rows={3}></textarea>
        <br />
        <label htmlFor="Invoice No" className="form-label label">Invoice No</label>
        <input className="form-control" type="text" id="Invoice No" />
        <br />
        <label htmlFor="Bill to" className="form-label label">Bill to</label>
        <input className="form-control" type="text" id="Bill to" />
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="Invoice Date" className="form-label label">Invoice Date</label>
            <input className="form-control" type="date" id="Invoice Date" />
          </div>
          <div className="col">
            <label htmlFor="Due Date" className="form-label label">Due Date</label>
            <input className="form-control" type="date" id="Due Date" />
          </div>
        </div>

        {/* Button Next Page */}
        <div className='mt-4' style={{ backgroundColor: 'red' }}>
          <Link href="/create-invoice/step-2" className="float-end">
            <Button buttonType="btn-primary" label="Next Page" />
          </Link>
        </div>
      </div>
      <br /><br />
    </div>
  )
}
