import Button from '../../atoms/Button'

interface InvoiceItemProps {
  company: string;
  date: string;
}

export default function InvoiceItem(props: InvoiceItemProps) {
  const { company, date } = props;

  return (
    <div className="mt-4">
      <table>
        <tbody>
          <tr>
            <td>
              <p className='label'>{company}</p>
              <p className='label-child'>Latest Update {date}</p>
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
  )
}
