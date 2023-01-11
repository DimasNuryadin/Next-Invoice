import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NumericFormat } from 'react-number-format'
import Button from '../../../../components/atoms/Button'
import ButtonShowItem from '../../../../components/molecules/ButtonShowItem'
import NavBar from '../../../../components/molecules/NavBar'
import Invoice from '../../../../components/organisms/Invoice'
import Sidebar from '../../../../components/organisms/Sidebar'
import { createDescription, createDownPayment, deleteDescription, deleteDownPayment, getDescription, getDownPayment, updateInvoicesStep2 } from '../../../../services/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { useReactToPrint } from 'react-to-print'

export default function Step2() {
  // Ambil data dari paramas
  const { query, isReady } = useRouter();
  const router = useRouter();
  const [dataStep1, setDataStep1] = useState({
    alamat_perusahaan: '',
    no_invoice: '',
    company: '',
    invoice_date: new Date,
    due_date: new Date
  })
  const [payment_instruction, setPayment_instruction] = useState('')

  const [discount, setDiscount] = useState({
    active: false,
    value: 0
  })
  const [tax, setTax] = useState({
    active: false,
    value: 0
  })
  const [shipping, setShipping] = useState({
    active: false,
    value: 0
  })

  const [desc, setDesc] = useState([{ id_invoices: 0, description: "", qty: 1, rate: 0 }])
  const [dp, setDp] = useState([{ id_invoices: 0, date: new Date, rate: 0 }])

  const getInvoiceAPI = useCallback(async (id: any) => {
    // Get Description & Down Payment
    const dataDescriptions = await getDescription(id)
    const dataDownPayments = await getDownPayment(id);

    if (dataDescriptions.data.data.length > 0) {
      setDesc(dataDescriptions.data.data)
    }

    if (dataDownPayments.data.data.length > 0) {
      setDp(dataDownPayments.data.data)
    }
  }, [])

  // Get data Step-1
  useEffect(() => {
    const localStep1: any = localStorage.getItem('step-1')
    const dataStep1 = JSON.parse(localStep1)
    setDataStep1(dataStep1);

    setDiscount({ active: true, value: dataStep1.discount });
    setTax({ active: true, value: dataStep1.tax });
    setShipping({ active: true, value: dataStep1.shipping });

    setPayment_instruction(dataStep1.payment_instruction)

    // console.log("data : ", dataStep1)

    if (isReady) {
      getInvoiceAPI(query.id);
    }
  }, [query, isReady, getInvoiceAPI])

  // Line Item Description
  const addLineDescription = () => {
    setDesc([...desc, { id_invoices: 0, description: "", qty: 1, rate: 0 }])
  }
  const removeLineDescription = (index: any) => {
    const list = [...desc]
    list.splice(index, 1)
    setDesc(list)
  }

  // Line Item DP
  const addLineDP = () => {
    setDp([...dp, { id_invoices: 0, date: new Date(), rate: 0 }])
  }
  const removeLineDP = (index: any) => {
    const list = [...dp]
    list.splice(index, 1)
    setDp(list)
  }

  // Handle Change Desc
  const handleChangeDesc = (e: any, index: any) => {
    const { name, value } = e.target
    const list: any = [...desc];
    list[index][name] = value;
    setDesc(list)
  }

  // Handle Change Dp
  const handleChangeDp = (e: any, index: any) => {
    const { name, value } = e.target
    const list: any = [...dp];
    list[index][name] = value;
    setDp(list)
  }

  // Subtotal
  let subTotal1 = desc.map(x => x.qty * x.rate)
  // console.log("Amount :", subTotal1)
  const subTotal = subTotal1.reduce(jumlahArray)
  function jumlahArray(total: number, value: number) {
    return total + value;
  }
  // console.log("sub total :", subTotal)

  // Total
  let totalDisc = subTotal * (discount.value / 100);
  let totalTax = subTotal * (tax.value / 100);
  let totalShipping = shipping.value;
  let total = subTotal - totalDisc + totalTax + totalShipping;

  // Sisa
  let dpRate = dp.map(x => Number(x.rate))
  let jumlahDP = dpRate.reduce(jumlahArray)
  // console.log('Sisa : ', jumlahDP)
  let sisa = total - jumlahDP

  const onSubmit = async () => {
    const invoicesForm = {
      payment_instruction,
      discount: discount.value,
      tax: tax.value,
      shipping: shipping.value
    }
    // console.log("invoices : ", invoicesForm)
    if (!payment_instruction) {
      toast.error('Payment Instruction wajib diisi!!')
    } else {
      Swal.fire({
        title: 'Apakah data sudah benar?',
        text: "Data akan disimpan di database!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Belum',
        confirmButtonText: 'Sudah!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateInvoicesStep2(invoicesForm, query.id)

          if (response.error) {
            toast.error(response.message)
            // console.log("form :", invoicesForm)
            // console.log("response : ", response)
          } else {
            deleteDescDP()
            toast.success("Berhasil tambah data")
            Swal.fire(
              'Disimpan',
              'Data sudah disimpan.',
              'success'
            )
            handlePrint();
          }
        }
      })
    }
  }

  // Delete descriptions & dp
  const deleteDescDP = async () => {
    const resDescDelete = await deleteDescription(query.id)
    const resDPDelete = await deleteDownPayment(query.id)

    if (!resDescDelete.error && !resDPDelete.error) {
      saveDescriptionDP()
    }
  }

  // Push Desc and DP to Database
  const saveDescriptionDP = () => {
    desc.forEach(async (x) => {
      x.id_invoices = Number(query.id)
      await createDescription(x);
    })

    dp.forEach(async (x) => {
      x.id_invoices = Number(query.id)
      await createDownPayment(x);
    })
  }

  // Print PDF
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => router.push('/client'),
  })

  return (
    <div className='invoice-page' >
      <Sidebar url="client" />
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

              {desc.map((data, index) => (
                <div key={index}>
                  <div className="row text-center description-input">
                    <div className="col-4">
                      <input type="text" className="form-control" name='description' value={data.description} onChange={(e) => handleChangeDesc(e, index)} />
                    </div>
                    <div className="col-1">
                      <input type="text" className="form-control" name='qty' value={data.qty} onChange={(e) => handleChangeDesc(e, index)} />
                    </div>
                    <div className="col-3">
                      <div className="input-group ">
                        <label className="input-group-text bg-white border-none" htmlFor="rate" style={{ fontSize: 15, padding: 6 }} >Rp</label>
                        <input type="text" className="form-control border-start-0" id="rate" name='rate' style={{ padding: '0px 2px' }} value={data.rate} onChange={(e) => handleChangeDesc(e, index)} />
                      </div>
                    </div>
                    <div className="col-4" >
                      <p className='float-start my-auto mt-1'>
                        <NumericFormat
                          value={data.rate * data.qty}
                          prefix="Rp. "
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                        />
                      </p>
                      {desc.length > 1 && (
                        <button className='bg-white float-end border-0 mt-1' onClick={() => removeLineDescription(index)}>X</button>
                      )}
                    </div>
                  </div>
                  {desc.length - 1 === index && desc.length < 10 && (
                    <Button buttonType="btn-secondary" label="Line Item" icon="plus" size="medium" active onClick={addLineDescription} />
                  )}
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className='text-bold text-end'>
              <div className='row'>
                <div className="col-6"></div>
                <p className='col-2 label text-start'>Subtotal</p>
                <p className='col-4 label'>
                  <NumericFormat
                    value={subTotal}
                    prefix="Rp. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>

              {/* Discount Tax Shipping */}
              <div>
                <ButtonShowItem label='Discount' onClick={() => setDiscount({ active: true, value: 0 })} />
                <ButtonShowItem label='Tax' onClick={() => setTax({ active: true, value: 0 })} />
                <ButtonShowItem label='Shipping' onClick={() => setShipping({ active: true, value: 0 })} />
              </div>

              {discount.active && (
                <div className="row mt-1">
                  <div className="col-6"></div>
                  <p className="col-2 my-auto label text-start">
                    Disc
                  </p>
                  <div className="col-3">
                    <div className="input-group float-start my-auto mt-1">
                      <input type="text" className="form-control border-end-0" id='disc' maxLength={3} value={discount.value} onChange={(event) => setDiscount({ active: true, value: Number(event.target.value) })} />
                      <label className="input-group-text bg-white border-none" style={{ fontSize: 15 }} htmlFor="disc" >%</label>
                    </div>
                  </div>
                  <div className='col-1 my-auto'>
                    <button className='bg-white float-end border-0 mt-1' onClick={() => setDiscount({ active: false, value: 0 })}>X</button>
                  </div>
                </div>
              )}

              {tax.active && (
                <div className="row mt-1">
                  <div className="col-6"></div>
                  <p className="col-2 my-auto label text-start">
                    Tax
                  </p>
                  <div className="col-3">
                    <div className="input-group float-start my-auto mt-1">
                      <input type="text" className="form-control border-end-0" id='tax' maxLength={3} value={tax.value} onChange={(event) => setTax({ active: true, value: Number(event.target.value) })} />
                      <label className="input-group-text bg-white border-none" style={{ fontSize: 15 }} htmlFor="tax" >%</label>
                    </div>
                  </div>
                  <div className='col-1 my-auto'>
                    <button className='bg-white float-end border-0 mt-1' onClick={() => setTax({ active: false, value: 0 })}>X</button>
                  </div>
                </div>
              )}

              {shipping.active && (
                <div className="row mt-1">
                  <div className="col-6"></div>
                  <p className="col-2 my-auto label text-start">
                    Shipping
                  </p>
                  <div className="col-3">
                    <div className="input-group my-auto mt-1 ">
                      <label className="input-group-text bg-white border-none" style={{ fontSize: 15, padding: 6 }} htmlFor="shipping" >Rp</label>
                      <input type="text" className="form-control border-start-0" style={{ padding: '0px 2px' }} id='shipping' value={shipping.value} onChange={(event) => setShipping({ active: true, value: Number(event.target.value) })} />
                    </div>
                  </div>
                  <div className='col-1 my-auto'>
                    <button className='bg-white float-end border-0 mt-1' onClick={() => setShipping({ active: false, value: 0 })}>X</button>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="row mt-3">
                <div className="col-6"></div>
                <p className='col-2 label text-start'>Total</p>
                <p className='col-4 label'>
                  <NumericFormat
                    prefix="Rp. "
                    value={total}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>

              {/* DP */}
              {dp.map((data, index) => (
                <div className="row mb-2" key={index}>
                  <div className="col-3"></div>
                  <div className="col-5">
                    <div className="row" >
                      <div className='col-1 my-auto'>
                        {dp.length - 1 === index && dp.length < 10 && (
                          <button className='border-0 bg-transparent' onClick={() => addLineDP()}>
                            <Image src="/icon/plus-dark.svg" width={10} height={10} alt="Plus Dark" />
                          </button>
                        )}
                      </div>
                      <p className='col-4 my-auto label text-start' style={{ width: 70 }}>DP {index + 1}</p>
                      <input className="form-control col" type="date" id="Due Date" name='date' value={data.date} onChange={(e) => handleChangeDp(e, index)} required />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group ">
                      <label className="input-group-text bg-white border-none" style={{ fontSize: 15, padding: 6 }} htmlFor="dp1" >Rp</label>
                      <input type="text" className="form-control border-start-0" style={{ padding: '0px 2px' }} name="rate" id="dp1" value={data.rate} onChange={(e) => handleChangeDp(e, index)} />
                    </div>
                  </div>
                  {dp.length > 1 && (
                    <div className='col-1 my-auto'>
                      <button className='bg-white float-end border-0 mt-1' onClick={removeLineDP}>X</button>
                    </div>
                  )}
                </div>
              ))}

              {/* Sisa */}
              <div className="row mt-1" >
                <div className="col-4"></div>
                <p className='col-4 label'>Sisa</p>
                <p className='col-4 label'>
                  <NumericFormat
                    prefix="Rp. "
                    value={sisa}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>
            </div>

            {/* Payment Instruction */}
            <div className='row'>
              <div className="col-7">
                <label htmlFor="Alamat Perusahaan" className="form-label label">Payments Instructions</label>
                <textarea
                  className="form-control"
                  id="Alamat Perusahaan"
                  rows={4}
                  value={payment_instruction}
                  onChange={(event) => setPayment_instruction(event.target.value)}
                />
              </div>
              <div className="col-5"></div>
            </div>

            <div className='mt-4'>
              <div className='float-end ms-4'>
                <Button buttonType="btn-primary" label="Submit" onClick={onSubmit} />
              </div>
              <Link href={`/create-invoice/${query.id}`} className='float-end' >
                <Button buttonType="btn-secondary" label="Back" />
              </Link>
            </div>
            <br /><br />
          </div>

          {/* Invoice */}
          <div className='col-6' >
            <div ref={componentRef}>
              <Invoice
                desc={desc}
                dp={dp}
                subTotal={subTotal}
                sisa={sisa}
                alamat_perusahaan={dataStep1.alamat_perusahaan}
                no_invoice={dataStep1.no_invoice}
                company={dataStep1.company}
                invoice_date={dataStep1.invoice_date}
                due_date={dataStep1.due_date}
                payment_instruction={payment_instruction}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}
