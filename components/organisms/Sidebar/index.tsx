import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../../atoms/Button'

interface SidebarProps {
  url: 'create-invoice' | 'clients';
}

export default function Sidebar(props: SidebarProps) {
  const { url } = props;

  if (url === 'create-invoice') {
    return (
      <div className='sidebar'>
        <Image className='mb-2' src="/img/logo-2.png" width={200} height={50} alt="Logo Kamojang" />
        <div className='mt-5'></div>
        <Link href="/CreateInvoice1">
          <Button buttonType="btn-primary" label="Create invoice" icon="pen" active />
        </Link>
        <br />
        <div className='mt-4'></div>
        <Link href="/Client">
          <Button buttonType="btn-inactive" label="Clients" icon="people" />
        </Link>
      </div>
    )
  }

  return (
    <div className='sidebar'>
      <Image className='mb-2' src="/img/logo-2.png" width={200} height={50} alt="Logo Kamojang" />
      <div className='mt-5'></div>
      <Link href="/CreateInvoice1">
        <Button buttonType="btn-inactive" label="Create invoice" icon="pen" />
      </Link>
      <br />
      <div className='mt-4'></div>
      <Link href="/Client">
        <Button buttonType="btn-primary" label="Clients" icon="people" active />
      </Link>
    </div>
  )
}
