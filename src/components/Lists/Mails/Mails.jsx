// Icons
import { CgRemove } from 'react-icons/cg';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

// Hooks
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';

const Mails = ({ mails }) => {
  const { deleteDocument } = useDeleteDocument('mailslist');
  const { state } = useDarkMode();

  if (mails === null) {
    return;
  }

  const handleDelete = (id) => {
    deleteDocument(id);
  };

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      <h1
        className={`text-xl font-bold my-4 ${
          state.darkMode ? 'text-cWhite' : 'text-cBlue'
        }`}>
        E-mails permitidos
      </h1>

      {mails.length > 0 &&
        mails
          .sort((a, b) => a.order - b.order)
          .map((mail) => (
            <div
              key={mail.id}
              className={`flex justify-between items-center p-4 mb-2 rounded-md ${
                state.darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'
              }`}>
              <p
                className={`w-1/2 ${
                  state.darkMode ? 'text-cWhite' : 'text-cDkBlack'
                }`}>
                {mail.email}
              </p>
              <div className='flex gap-4 text-xl'>
                <button type='button'>
                  <CgRemove
                    className='text-cRed'
                    onClick={() => {
                      handleDelete(mail.id);
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
      {mails.length === 0 && <p>Nenhum e-mail cadastrado!</p>}
    </div>
  );
};

export default Mails;
