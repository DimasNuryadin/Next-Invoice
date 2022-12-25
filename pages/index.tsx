import Image from "next/image"
import Button from "../components/atoms/Button"
import InputLogin from "../components/molecules/InputLogin"

export default function Home() {
  return (
    <section>
      <div className="bg-yellow">
        <Image src="/img/logo-kamojang.png" height={80} width={500} alt="logo" />
        <div className="text-center bg-login">
          <h1 className="title-login">LOGIN</h1>
          <InputLogin type="email" pic="email" placeholder="Email" />
          <InputLogin type="password" pic="key" placeholder="Password" />
          <div className="mt-5">
            <Button buttonType="btn-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
