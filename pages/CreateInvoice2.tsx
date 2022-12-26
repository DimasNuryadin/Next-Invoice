import React from 'react'
import NavBar from '../components/molecules/NavBar'
import Sidebar from '../components/organisms/Sidebar'

export default function CreateInvoice2() {
  return (
    <div className='invoice-page'>
      <Sidebar />
      <div className='dashboard'>
        <NavBar />

        {/* Create Invoice */}
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
            <p>Invoice</p>
          </div>
        </div>
      </div>
    </div>
  )
}
