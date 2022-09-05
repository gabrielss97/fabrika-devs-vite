// Icons
import { CgRemove } from 'react-icons/cg';

// Hooks
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const MailsList = ({ mails }) => {
  const { deleteDocument } = useDeleteDocument('mailslist');

  if (mails === null) {
    return;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {mails.length > 0 &&
        mails
          .sort((a, b) => a.order - b.order)
          .map((mail) => (
            <div
              key={mail.id}
              className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
              <p className='w-1/2 text-cDkGray'>{mail.email}</p>
              <div className='flex gap-4 text-xl'>
                <button type='button'>
                  <CgRemove
                    className='text-cRed'
                    onClick={() => deleteDocument(mail.id)}
                  />
                </button>
              </div>
            </div>
          ))}
      {mails.length === 0 && <p>Nenhum e-mail cadastrado!</p>}
    </div>
  );
};

export default MailsList;
