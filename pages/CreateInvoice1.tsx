import React from 'react'
import Button from '../components/atoms/Button'
import NavBar from '../components/molecules/NavBar'
import Sidebar from '../components/organisms/Sidebar'

export default function CreateInvoice1() {
  return (
    <div className='invoice-page'>
      <Sidebar />
      <div className='dashboard'>
        <NavBar />

        {/* Create Invoice */}
        <h2 className='mt-4'>CREATE INVOICES</h2>
        <div className='row mt-3 create-invoice'>
          <div className='col'>
            <div className="mb-3">
              <label htmlFor="Alamat Perusahaan" className="form-label">Alamat Perusahaan</label>
              <textarea className="form-control" id="Alamat Perusahaan" rows={3}></textarea>
              <br />
              <label htmlFor="Invoice No" className="form-label">Invoice No</label>
              <input className="form-control" type="text" id="Invoice No" />
              <br />
              <label htmlFor="Bill to" className="form-label">Bill to</label>
              <input className="form-control" type="text" id="Bill to" />
              <br />
              <div className="row">
                <div className="col">
                  <label htmlFor="Invoice Date" className="form-label">Invoice Date</label>
                  <input className="form-control" type="date" id="Invoice Date" />
                </div>
                <div className="col">
                  <label htmlFor="Due Date" className="form-label">Due Date</label>
                  <input className="form-control" type="date" id="Due Date" />
                </div>
              </div>
              <div className='mt-4 nav justify-content-end'>
                <Button buttonType="btn-primary" label="Next Page" />
              </div>
            </div>
          </div>
          <div className='col' style={{ backgroundColor: 'blue' }} >
            <p>Invoice</p>
          </div>
        </div>

        {/* Create Invoice
        <h2 className='mt-4'>CREATE INVOICES</h2>
        <div className='row mt-3 create-invoice'>
          <div className='col'>
            <div className='row text-center'>
              <div className="col-5">Description</div>
              <div className="col-1">Qty</div>
              <div className="col-3">Rate</div>
              <div className="col-3">Amount</div>
            </div>
          </div>
          <div className='col' style={{ backgroundColor: 'blue' }} >
            <p>Logout</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
