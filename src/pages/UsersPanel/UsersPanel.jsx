// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import AddMail from '../../components/AddMail/AddMail';
import UsersList from '../../components/UsersList/UsersList';
import MailsList from '../../components/MailsList/MailsList';

const UsersPanel = () => {
  const { documents: emails } = useFetchDocuments('mailslist');

  const [active, setActive] = useState(false);

  return (
    <div className='p-4 flex flex-col'>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>

      <div>
        <h1>E-mails permitidos</h1>
        <MailsList mails={emails} />
      </div>
      <div>
        <h1>Usuários Cadastrados</h1>
        <UsersList />
      </div>

      <div
        className={`${
          active
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddMail setActive={setActive} mails={emails} />
      </div>
    </div>
  );
};

export default UsersPanel;
