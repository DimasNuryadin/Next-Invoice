import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../components/atoms/Button'
import NavBar from '../components/molecules/NavBar'
import Sidebar from '../components/organisms/Sidebar'

export default function CreateInvoice1() {
  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />

        <div className='row mt-5 create-invoice'>
          <div className='col-5'>
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
              <div className='mt-4 text-end'>
                <Link href="/CreateInvoice2">
                  <Button buttonType="btn-primary" label="Next Page" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-1 line-1">
            <div></div>
            <div></div>
            <br />
          </div>

          {/* Invoice */}
          <div className='col-6'>
            <div className="invoice">
              <div className="row">
                <div className="col cek">
                  <Image src="/img/logo-3.png" width={160} height={40} alt="Logo Kamojang" />
                  <p className='mt-3 invoice-address'>
                    Jl. Raya Kamojang No. 74 RT. 03 RW. 06
                    Ds. Laksana Kec. Ibun Kab. Bandung
                    Mobile : 08123456789
                    Email : contoh@email.com
                  </p>
                </div>
                <p className="col text-end invoice-title">
                  INVOICE
                </p>
              </div>

              <div className="row bill-information">
                <div className="col">
                  <p className='head-table'>Bill To :</p>
                  <p className='bill'>PT ABC</p>
                </div>
                <div className="col text-end">
                  <p className='head-table'>Invoice No : KMD/.../...-...</p>
                  <p className='bill'>Invoice Date : 12 Des 2022</p>
                  <p className='bill'>Due Date :  12 Des 2022</p>
                </div>
              </div>
              <br />
              <div className="row bill-information" style={{ height: '44px' }}>
                <p className='col-1 head-table'>No</p>
                <p className='col-4 head-table'>Description</p>
                <p className='col-1 head-table'>Qty</p>
                <p className='col-3 head-table'>Rate</p>
                <p className='col-3 head-table'>Amount</p>
              </div>

              <div className="row name-invoice">
                <p className='col-1 text-center'>1</p>
                <p className='col-4'>Lorem ipsum dolor sit amet
                  consectetur.</p>
                <p className='col-1 text-center'>2</p>
                <p className='col-3'>Rp 2.000.000</p>
                <p className='col-3'>Rp 4.000.000</p>
              </div>

              <div className="row name-invoice">
                <p className='col-1 text-center'>2</p>
                <p className='col-4'>Lorem ipsum dolor sit amet
                  consectetur.</p>
                <p className='col-1 text-center'>2</p>
                <p className='col-3'>Rp 2.000.000</p>
                <p className='col-3'>Rp 4.000.000</p>
              </div>

              {/* Subtotal */}
              <div className="row mt-2 subtotal">
                <p className='col-5'></p>
                <p className='col-1 text-center'></p>
                <p className='col-3 head-table'>SUBTOTAL</p>
                <p className='col-3 head-table'>Rp 5.000.000</p>
              </div>

              {/* DP */}
              <div className="row dp">
                <p className='col-5'></p>
                <p className='col-1 text-center'></p>
                <div className='col-3'>
                  <p className='head-table' style={{ float: 'left', marginRight: 8 }}>DP 1 </p>
                  <p>16 Des 22</p>
                </div>
                <p className='col-3'>Rp 1.000.000</p>
              </div>
              <div className="row dp">
                <p className='col-5'></p>
                <p className='col-1 text-center'></p>
                <div className='col-3'>
                  <p className='head-table' style={{ float: 'left', marginRight: 8 }}>DP 2 </p>
                  <p>16 Des 22</p>
                </div>
                <p className='col-3'>Rp 1.000.000</p>
              </div>

              {/* Sisa */}
              <div className="row subtotal">
                <p className='col-5'></p>
                <p className='col-1 text-center'></p>
                <p className='col-3 head-table'>SISA</p>
                <p className='col-3 head-table'>Rp 4.000.000</p>
              </div>

              {/* Payment Instruction */}
              <div className="payment-isntructions">
                <p className='head-table'>Payments Instructions</p>
                <p className='invoice-address'>
                  Pembayaran melalui rekening :

                  PT KAMOJANG MANDIRI
                  BANK MANDIRI
                  A/C No. 1310001204009
                  REK. DOLLAR PT KAMOJANG MANDIRI
                  No. 131-00-1967023-3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
