import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/atoms/Button'
import ButtonShowItem from '../components/molecules/ButtonShowItem'
import NavBar from '../components/molecules/NavBar'
import Invoice from '../components/organisms/Invoice'
import Sidebar from '../components/organisms/Sidebar'

export default function CreateInvoice2() {
  return (
    <div className='invoice-page'>
      <Sidebar url="create-invoice" />
      <div className='dashboard'>
        <NavBar />
        <div className='row mt-5 pt-4'>

          <div className='col-6 pe-5 create-invoice'>
            <h2 className='title-2'>CREATE INVOICES</h2>
            <div className='mb-3 mt-5 invoice-description'>
              <div className="row text-center head">
                <p className="col-4 head-table">Description</p>
                <p className="col-1 head-table">Qty</p>
                <p className="col-3 head-table">Rate</p>
                <p className="col-3 head-table">Amount</p>
              </div>

              <div className="row text-center description-input">
                <div className="col-4">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-1">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <div className="input-group ">
                    <label className="input-group-text bg-white border-none" htmlFor="rate" style={{ fontSize: 15, padding: 6 }} >Rp</label>
                    <input type="text" className="form-control border-start-0" id="rate" style={{ padding: '0px 2px' }} />
                  </div>
                </div>
                <div className="col-4" >
                  <p className='float-start my-auto mt-1'>Rp. 150.0000</p>
                  <button className='bg-white float-end border-0 mt-1'>X</button>
                </div>
              </div>

              <div className="row text-center description-input">
                <div className="col-4">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-1">
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <div className="input-group ">
                    <label className="input-group-text bg-white border-none" htmlFor="rate" style={{ fontSize: 15, padding: 6 }} >Rp</label>
                    <input type="text" className="form-control border-start-0" id="rate" style={{ padding: '0px 2px' }} />
                  </div>
                </div>
                <div className="col-4" >
                  <p className='float-start my-auto mt-1'>Rp. 150.0000</p>
                  <button className='bg-white float-end border-0 mt-1'>X</button>
                </div>
              </div>

            </div>
            <Button buttonType="btn-secondary" label="Line Item" icon="plus" size="medium" active />

            {/* Subtotal */}
            <div className='text-bold text-end'>
              <div className='row'>
                <div className="col-6"></div>
                <p className='col-2 label text-start'>Subtotal</p>
                <p className='col-4 label'>Rp. 250.000</p>
              </div>

              {/* Discount Tax Shipping */}
              <div>
                <ButtonShowItem label='Discount' />
                <ButtonShowItem label='Tax' />
                <ButtonShowItem label='Shipping' />
              </div>

              <div className="row mt-1">
                <div className="col-6"></div>
                <p className="col-2 my-auto label text-start">
                  Disc
                </p>
                <div className="col-3">
                  <div className="input-group float-start my-auto mt-1">
                    <input type="text" className="form-control border-end-0" id='disc' style={{ padding: '0px 2px' }} />
                    <label className="input-group-text bg-white border-none" style={{ fontSize: 15 }} htmlFor="disc" >%</label>
                  </div>
                </div>
                <div className='col-1 my-auto'>
                  <button className='bg-white float-end border-0 mt-1'>X</button>
                </div>
              </div>

              {/* Total */}
              <div className="row mt-3">
                <div className="col-6"></div>
                <p className='col-2 label text-start'>Total</p>
                <p className='col-4 label'>Rp. 250.000</p>
              </div>

              {/* DP */}
              <div className="row mb-2">
                <div className="col-4"></div>
                <div className="col-5">
                  <div className="row" >
                    <button className='col-1 my-auto border-0 bg-transparent'>
                      <Image src="/icon/plus-dark.svg" width={10} height={10} alt="Plus Dark" />
                    </button>
                    <p className='col-4 my-auto label text-start'>DP 1</p>
                    <input className="form-control col" type="date" id="Due Date" required />
                  </div>
                </div>
                <div className="col-3">
                  <div className="input-group ">
                    <label className="input-group-text bg-white border-none" style={{ fontSize: 15, padding: 6 }} htmlFor="dp1" >Rp</label>
                    <input type="text" className="form-control border-start-0" style={{ padding: '0px 2px' }} id="dp1" />
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-4"></div>
                <div className="col-5">
                  <div className="row" >
                    <button className='col-1 my-auto border-0 bg-transparent'>
                      <Image src="/icon/plus-dark.svg" width={10} height={10} alt="Plus Dark" />
                    </button>
                    <p className='col-4 my-auto label text-start'>DP 2</p>
                    <input className="form-control col" type="date" id="Due Date" required />
                  </div>
                </div>
                <div className="col-3">
                  <div className="input-group ">
                    <label className="input-group-text bg-white border-none" style={{ fontSize: 15, padding: 6 }} htmlFor="dp2" >Rp</label>
                    <input type="text" className="form-control border-start-0" style={{ padding: '0px 2px' }} id="dp2" />
                  </div>
                </div>
              </div>

              {/* Sisa */}
              <div className="row mt-1">
                <div className="col-4"></div>
                <p className='col-4 label'>Sisa</p>
                <p className='col-4 label'>Rp. XXX.000</p>
              </div>
            </div>

            {/* Payment Instruction */}
            <div className='row'>
              <div className="col-7">
                <label htmlFor="Alamat Perusahaan" className="form-label label">Payments Instructions</label>
                <textarea className="form-control" id="Alamat Perusahaan" rows={4}></textarea>
              </div>
              <div className="col-5"></div>
            </div>

            {/* Button Submit */}
            <div className='mt-4 text-end' style={{ backgroundColor: 'red' }}>
              {/* Bug di Link */}
              <Link href="/CreateInvoice2" >
                <Button buttonType="btn-primary" label="Submit" />
              </Link>
            </div>
            <br /><br />
          </div>

          {/* Invoice */}
          <Invoice />
        </div>
      </div>
    </div>
  )
}
