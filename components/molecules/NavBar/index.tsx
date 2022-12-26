import Button from "../../atoms/Button";

export default function NavBar() {
  return (
    <div className='row nav-bar'>
      <div className='col nav justify-content-end' style={{ backgroundColor: 'red' }} >
        <p>Search</p>
      </div>
      <div className='col nav justify-content-end'>
        <Button buttonType="btn-primary" label="Logout" />
      </div>
    </div>
  )
}
