import Image from 'next/image'

export default function Invoice() {
  return (
    <div className='col-6'>
      <div className="invoice">
        <div className="row">
          <div className="col cek">
            <Image src="/img/logo-3.png" width={160} height={40} alt="Logo Kamojang" />
            <p className='mt-3 invoice-address'>
              Jl. Raya Kamojang No. 74 RT. 03 RW. 06
              Ds. Laksana Kec. Ibun Kab. Bandung
              Mobile : 08123456789
              /n Email : contoh@email.com
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
          <p className='col-6'></p>
          <p className='col-3 head-table'>SUBTOTAL</p>
          <p className='col-3 head-table'>Rp 5.000.000</p>
        </div>

        {/* DP */}
        <div className="row dp">
          <p className='col-6'></p>
          <div className='col-3'>
            <p className='head-table float-start' >DP 1</p>
            <p className='float-end me-2'>16 Des 22</p>
          </div>
          <p className='col-3'>Rp 1.000.000</p>
        </div>
        <div className="row dp">
          <p className='col-6'></p>
          <div className='col-3'>
            <p className='head-table float-start' >DP 1</p>
            <p className='float-end me-2'>16 Des 22</p>
          </div>
          <p className='col-3'>Rp 1.000.000</p>
        </div>

        {/* Sisa */}
        <div className="row subtotal">
          <p className='col-6'></p>
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
  )
}
