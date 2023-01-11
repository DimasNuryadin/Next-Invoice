import Cookies from "js-cookie";
import Image from "next/image";
import Button from "../../atoms/Button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [company, setCompany] = useState('');

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/')
  }

  return (
    <div className='row nav-bar'>
      <form action={`/client/search/${company}`} method="post" className='col-6 nav justify-content-end input-search'>
        <Image src="/icon/search.svg" width={24} height={24} alt="Search" className="search-icon" />
        <input type="text" placeholder="Search" value={company} onChange={(event) => setCompany(event.target.value)} required />
      </form>
      <div className='col-6 nav justify-content-end'>
        <Button buttonType="btn-primary" label="Logout" onClick={onLogout} />
      </div>
    </div>
  )
}
