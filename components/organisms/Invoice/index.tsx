import Image from 'next/image'
import { NumericFormat } from 'react-number-format'
import moment from 'moment';

interface InvoiceProps {
  alamat_perusahaan: string;
  no_invoice: string;
  company: string;
  invoice_date: Date;
  due_date: Date;
  payment_instruction: string;
  desc?: Desc[];
  dp?: Dp[];
  subTotal?: number;
  sisa?: number;
}

interface Desc {
  description: string;
  qty: number;
  rate: number;
}

interface Dp {
  date: Date;
  rate: number;
}

export default function Invoice(props: Partial<InvoiceProps>) {
  const {
    desc,
    dp,
    subTotal,
    sisa,
    alamat_perusahaan,
    no_invoice,
    company,
    invoice_date,
    due_date,
    payment_instruction,
  } = props;

  return (
    <div>
      <div className="invoice">
        <div className="row">
          <div className="col cek">
            <Image src="/img/logo-3.png" width={160} height={40} alt="Logo Kamojang" />
            <p className='mt-3 invoice-address'>
              {alamat_perusahaan}
            </p>
          </div>
          <p className="col text-end invoice-title">
            INVOICE
          </p>
        </div>

        <div className="row bill-information">
          <div className="col">
            <p className='head-table'>Bill To :</p>
            <p className='bill'>{company}</p>
          </div>
          <div className="col text-end">
            <p className='head-table'>Invoice No : {no_invoice}</p>
            <p className='bill'>Invoice Date : {moment(invoice_date).format('DD MMM YY')}</p>
            <p className='bill'>Due Date :  {moment(due_date).format('DD MMM YY')}</p>
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

        {/* Description */}
        {desc && (
          desc.map((data, index) => {
            return (
              <div className="row name-invoice" key={index}>
                <p className='col-1 text-center'>{index + 1}</p>
                <p className='col-4'>{data.description}</p>
                <p className='col-1 text-center'>{data.qty}</p>
                <p className='col-3'>
                  <NumericFormat
                    prefix="Rp. "
                    value={data.rate}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
                <p className='col-3'>
                  <NumericFormat
                    prefix="Rp. "
                    value={data.qty * data.rate}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>
            )
          })
        )}

        {/* Subtotal */}
        <div className="row mt-2 subtotal">
          <p className='col-6'></p>
          <p className='col-3 head-table'>SUBTOTAL</p>
          <p className='col-3 head-table'>
            <NumericFormat
              prefix="Rp. "
              value={subTotal}
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </p>
        </div>

        {/* DP */}
        {dp && (
          dp.map((data, index) => (
            <div className="row dp" key={index}>
              <p className='col-6'></p>
              <div className='col-3'>
                <p className='head-table float-start' >DP {index + 1}</p>
                <p className='float-end me-2'>{moment(data.date).format('DD MMM YY')}</p>
              </div>
              {/* 16 Des 22 */}
              <p className='col-3'>
                <NumericFormat
                  prefix="Rp. "
                  value={data.rate}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </p>
            </div>
          ))
        )}

        {/* Sisa */}
        <div className="row subtotal">
          <p className='col-6'></p>
          <p className='col-3 head-table'>SISA</p>
          <p className='col-3 head-table'>
            <NumericFormat
              prefix="Rp. "
              value={sisa}
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </p>
        </div>

        {/* Payment Instruction */}
        <div className="payment-isntructions">
          <p className='head-table'>Payments Instructions</p>
          <p className='invoice-address'>{payment_instruction}</p>
        </div>
      </div>
    </div>
  )
}
