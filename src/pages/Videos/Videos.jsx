// Hooks
import React, { useState } from 'react';

import { BsPlusLg } from 'react-icons/bs';

// Components
import AddVideoForm from '../../components/AddVideoForm/AddVideoForm';
import VideosList from '../../components/VideosList/VideosList';

const Videos = () => {
  const [active, setActive] = useState(false);

  return (
    <div className='p-4 flex flex-col'>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>
      <VideosList />

      <div
        className={`${
          active
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddVideoForm setActive={setActive} />
      </div>
    </div>
  );
};

export default Videos;
