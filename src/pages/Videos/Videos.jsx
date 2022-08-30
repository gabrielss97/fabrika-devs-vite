// Hooks
import React, { useState } from 'react';

import { BiPlus } from 'react-icons/bi';

// Components
import AddVideoForm from '../../components/AddVideoForm/AddVideoForm';
import VideosList from '../../components/VideosList/VideosList';

const Videos = () => {
  const [active, setActive] = useState(false);

  return (
    <div className=''>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-36 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl '>
        Novo <BiPlus className='text-2xl' />
      </button>
      <VideosList />

      <div
        className={`${
          active ? 'absolute w-full h-[100vh] bg-cDkGray top-0' : 'hidden'
        }`}>
        <AddVideoForm setActive={setActive} />
      </div>
    </div>
  );
};

export default Videos;
