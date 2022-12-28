import Button from '../components/atoms/Button'
import NavBar from '../components/molecules/NavBar'
import Sidebar from '../components/organisms/Sidebar'

export default function Clients() {
  return (
    <div className='invoice-page'>
      <Sidebar url="clients" />
      <div className='dashboard'>
        <NavBar />

        <div className='row mt-5 client'>
          <div className='col-11'>
            <h2 className='title-2'>CLIENTS</h2>

            {/* CLient List */}
            <div className="mt-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p className='label'>PT ABC</p>
                      <p className='label-child'>Latest Update 12/12/2022</p>
                    </td>
                    <td className='cta-button text-end'>
                      <Button label='Edit' buttonType="btn-secondary" />
                      <Button label='Lihat' buttonType="btn-tertiary" />
                      <Button label='Hapus' buttonType="btn-quaternary" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className='label'>PT ABC</p>
                      <p className='label-child'>Latest Update 12/12/2022</p>
                    </td>
                    <td className='cta-button text-end'>
                      <Button label='Edit' buttonType="btn-secondary" />
                      <Button label='Lihat' buttonType="btn-tertiary" />
                      <Button label='Hapus' buttonType="btn-quaternary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-1 line-2">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
