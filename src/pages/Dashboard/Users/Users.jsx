// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Components
import AddMail from '../../../components/AddModal/AddMail/AddMail';
import Mails from '../../../components/Lists/Mails/Mails';
import UsersList from '../../../components/Lists/Users/Users';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const Users = () => {
  const { documents: emails } = useFetchDocuments('mailslist');

  const { state } = useDarkMode();

  const [active, setActive] = useState(false);

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>

      <div>
        <Mails mails={emails} />
      </div>
      <div>
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

export default Users;
