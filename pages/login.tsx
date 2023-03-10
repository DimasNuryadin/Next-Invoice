import Image from "next/image"
import Button from "../components/atoms/Button"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { setLogin } from "../services/auth";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import Loading from "../components/molecules/Loading";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async () => {
    setIsLoading(true);

    const data = {
      email,
      password
    }
    if (!email || !password) {
      toast.error("Email dan Password wajib diisi!!!");
      setIsLoading(false)
    } else {
      const response = await setLogin(data)
      if (response.error) {
        toast.error(response.message)
        setIsLoading(false)
      } else {
        toast.success("Login Berhasil")
        const token = response.data.token
        // console.log("token :", token)
        const tokenBase64 = btoa(token);
        // console.log("Base 64 : ", tokenBase64)
        Cookies.set('token', tokenBase64, { expires: 1 }) // 1 day
        router.push('/create-invoice');
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <div className="bg-yellow">
        <Image className="logo" src="/img/logo-1.png" height={80} width={500} alt="logo" />
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

export async function getServerSideProps({ req }: any) {
  const { token } = req.cookies
  if (token) {
    return {
      redirect: {
        destination: '/create-invoice',
        permanent: false,
      }
    }
  }

  // console.log("token: ", token)
  return {
    props: {
      user: {},
    }
  }
}