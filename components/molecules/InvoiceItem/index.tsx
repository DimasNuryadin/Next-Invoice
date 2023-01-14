import Link from 'next/link';
import Button from '../../atoms/Button'
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';

interface InvoiceItemProps {
  company: string;
  date: string;
  id: number;
  onRead: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function InvoiceItem(props: InvoiceItemProps) {
  const { company, date, id, onRead, onDelete } = props;

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
              <Link href={`/client/update/${id}`}>
                <Button label='Edit' buttonType="btn-secondary" />
              </Link>
              <Button label='Lihat' buttonType="btn-tertiary" onClick={onRead} />
              <Button label='Hapus' buttonType="btn-quaternary" onClick={onDelete} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
