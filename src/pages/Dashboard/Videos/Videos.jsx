// Hooks
import React, { useState } from 'react';

// Icons
import { BsPlusLg } from 'react-icons/bs';

// Components
import AddVideo from '../../../components/AddModal/AddVideo/AddVideo';
import EditVideo from '../../../components/EditModal/EditVideo/EditVideo';
import VideosList from '../../../components/Lists/Videos/Videos';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const Videos = () => {
  const [activeAdd, setActiveAdd] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [video, setVideo] = useState(false);

  const { state } = useDarkMode();

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <button
        type='button'
        onClick={() => setActiveAdd(!activeAdd)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>
      <VideosList setActive={setActiveEdit} setVideo={setVideo} />

      <div
        className={`${
          activeAdd
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddVideo setActive={setActiveAdd} />
      </div>
      <div
        className={`${
          activeEdit
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <EditVideo setActive={setActiveEdit} video={video} />
      </div>
    </div>
  );
};

export default Videos;
