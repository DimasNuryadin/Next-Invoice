import Image from "next/image"
import Button from "../components/atoms/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { setLogin } from "../services/auth";
import Cookies from 'js-cookie'
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {

  }

  return (
    <div>
      <div className="home">
        <nav className="navbar mb-5">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{ marginLeft: '-10px' }}>
              <Image src="/img/logo-1.png" height={80} width={500} alt="logo" />
            </a>
            <Link href='/login'>
              <Button buttonType="btn-primary" label="Login" />
            </Link>
          </div>
        </nav>

        <section className="hero-banner mb-4">
          <h1 className="title mb-3">TENTANG KAMI</h1>
          <p className="description">Berawal dengan kegiatan usaha yang hanya meliputi pekerjaan pengadaan barang dan jasa ketika didirikan pada tahun 2005 PT Kamojang Mandiri untuk kepentingan perusahaan di sekitar Area Kamojang, saat ini memperluas cakupan pelayanan barang dan jasa ke wilayah lainnya. Langkah-langkah antisipatif dan inovatif pun semakin mudah diwujudkan. PT Kamojang Mandiri tetap berdiri selama lebih satu dasa warsa menghadapi berbagai krisis, baik skala nasional maupun global. Pada tahun 2022, KM resmi menetapkan Visi dan Misi perusahaan untuk menjawab tantangan masa depan Perseroan. PT Kamojang Mandiri berkomitmen untuk melaksanakan peran pentingnya dalam menghadirkan kualitas kehidupan yang lebih baik. Diversifikasi bisnis menjadi keunggulan KM untuk menangkap potensi yang ada di pasar nasional dan internasional berupa pengembangan usaha ke bidang jasa pariwisata dan travel haji & umroh.</p>
        </section>

        <section style={{ display: 'block' }}>
          <div className="footer">
            <div className="gap"></div>
            <div className="email-form">
              <p className="title mb-4">Send Us a message</p>
              <div className="input-email mb-4 pt-1 pb-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="input-email mb-4 pb-2">
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="input-email mb-4 pb-2">
                <input
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <textarea className="input-message mb-2" name="message" placeholder="Message" rows={6} />

              <div className="float-end">
                <Button buttonType="btn-primary" label="Send" />
              </div>
            </div>

            <div className="contact">
              <h2 className="title mb-5">Contact Us</h2>

              <div className="d-flex flex-row mb-4">
                <Image src="/icon/phone-light.svg" width={28} height={28} alt="Phone"></Image>
                <p className="ms-3">0812-2025-9288</p>
              </div>

              <div className="d-flex flex-row mb-4">
                <Image src="/icon/email-light.svg" width={28} height={28} alt="Phone"></Image>
                <p className="ms-3">kamojangmandiri1@gmail.com</p>
              </div>

              <div className="d-flex flex-row ">
                <Image src="/icon/address-light.svg" width={28} height={28} alt="Phone"></Image>
                <p className="ms-3">Jl. Raya Kamojang No. 74-Kab. Bandung</p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <ToastContainer />
    </div>
  )
}