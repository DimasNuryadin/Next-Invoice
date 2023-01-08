import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../../atoms/Button'

interface SidebarProps {
  url: 'create-invoice' | 'client';
}

export default function Sidebar(props: SidebarProps) {
  const { url } = props;

  if (url === 'create-invoice') {
    return (
      <div className='sidebar'>
        <Image className='mb-2' src="/img/logo-2.png" width={200} height={50} alt="Logo Kamojang" />
        <div className='mt-5'></div>
        <Link href="/create-invoice">
          <Button buttonType="btn-primary" label="Create invoice" icon="pen" size="large" active />
        </Link>
        <br />
        <div className='mt-4'></div>
        <Link href="/client">
          <Button buttonType="btn-inactive" label="Clients" icon="people" size="large" />
        </Link>
      </div>
    )
  }

  return (
    <div className='sidebar'>
      <Image className='mb-2' src="/img/logo-2.png" width={200} height={50} alt="Logo Kamojang" />
      <div className='mt-5'></div>
      <Link href="/create-invoice">
        <Button buttonType="btn-inactive" label="Create invoice" icon="pen" size="large" />
      </Link>
      <br />
      <div className='mt-4'></div>
      <Link href="/client">
        <Button buttonType="btn-primary" label="Clients" icon="people" size="large" active />
      </Link>
    </div>
  )
}
