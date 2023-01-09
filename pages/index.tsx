import Image from "next/image"
import Button from "../components/atoms/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { setLogin } from "../services/auth";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.push('/create-invoice')
    }
  }, [router])

  const onSubmit = async () => {
    const data = {
      email,
      password
    }
    if (!email || !password) {
      toast.error("Email dan Password wajib diisi!!!");
    } else {
      const response = await setLogin(data)
      if (response.error) {
        toast.error(response.message)
      } else {
        toast.success("Login Berhasil")
        const token = response.data.token
        // console.log("token :", token)
        const tokenBase64 = btoa(token);
        // console.log("Base 64 : ", tokenBase64)
        Cookies.set('token', tokenBase64, { expires: 1 }) // 1 day
        router.push('/create-invoice');
      }
    }
  }

  return (
    <div>
      <div className="bg-yellow">
        <Image src="/img/logo-1.png" height={80} width={500} alt="logo" />
        <div className="text-center bg-login">
          <h1 className="title-login">LOGIN</h1>
          <div className="input-login row">
            <Image className="image-login col" src="/icon/email.svg" width={24} height={24} alt="mail" />
            <div className="col">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-login row">
            <Image className="image-login col" src="/icon/key.svg" width={24} height={24} alt="mail" />
            <div className="col">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-5" >
            <Button buttonType="btn-primary" label="Submit" onClick={onSubmit} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
