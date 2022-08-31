// Hooks
import { useState } from 'react';

// Icons
import { BsPlusLg } from 'react-icons/bs';

// Components
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersList from '../../components/UsersList/UsersList';

const UsersPanel = () => {
  const [active, setActive] = useState(false);

  return (
    <div className='p-4 flex flex-col'>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>
      <UsersList />

      <div
        className={`${
          active
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddUserForm setActive={setActive} />
      </div>
    </div>
  );
};

export default UsersPanel;
