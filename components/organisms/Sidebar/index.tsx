import Image from 'next/image'
import React from 'react'
import Button from '../../atoms/Button'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Image className='mb-2' src="/img/logo-sidebar.png" width={200} height={50} alt="Logo Kamojang" />
      <div className='mt-5'></div>
      <Button buttonType="btn-primary" label="Create invoice" icon="pen" active />
      <br />
      <div className='mt-4'></div>
      <Button buttonType="btn-inactive" label="Clients" icon="people" />
    </div>
  )
}
