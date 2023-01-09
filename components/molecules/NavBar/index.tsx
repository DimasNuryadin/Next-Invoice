import Cookies from "js-cookie";
import Image from "next/image";
import Button from "../../atoms/Button";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/')
  }

  return (
    <div className='row nav-bar'>
      <div className='col-6 nav justify-content-end input-search'>
        <Image src="/icon/search.svg" width={24} height={24} alt="Search" className="search-icon" />
        <input type="text" placeholder="Search" aria-label="Search" aria-describedby="Search" />
      </div>
      <div className='col-6 nav justify-content-end'>
        <Button buttonType="btn-primary" label="Logout" onClick={onLogout} />
      </div>
    </div>
  )
}
