import Link from 'next/link';
import Button from '../../atoms/Button'
import moment from 'moment';

interface InvoiceItemProps {
  company: string;
  date: string;
  id: number;
}

export default function InvoiceItem(props: InvoiceItemProps) {
  const { company, date, id } = props;

  return (
    <div className="mt-4">
      <table>
        <tbody>
          <tr>
            <td>
              <p className='label'>{company}</p>
              <p className='label-child'>Latest Update {moment(date).format('DD/MM/YYYY')}</p>
            </td>
            <td className='cta-button text-end'>
              <Link href={`/client/edit/${id}`}>
                <Button label='Edit' buttonType="btn-secondary" />
              </Link>
              <Link href={`/client/read/${id}`}>
                <Button label='Lihat' buttonType="btn-tertiary" />
              </Link>
              <Button label='Hapus' buttonType="btn-quaternary" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
