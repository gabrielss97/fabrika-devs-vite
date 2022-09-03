// Icons
import { RiArrowDropDownLine } from 'react-icons/ri';

// Hooks
import { useState } from 'react';

const ContentList = ({ category, videos, setCurrentVideo }) => {
  // State para dimiuir e expandir os conteúdos
  const [active, setActive] = useState(true);

  return (
    <div className='w-full md:max-w-7xl mx-auto'>
      <div
        onClick={() => setActive(!active)}
        className=' flex justify-between  text-cBlue font-bold cursor-pointer p-2 '>
        <p className=' text-lg uppercase font-bold'>{category}</p>
        <RiArrowDropDownLine
          className={`${active ? 'rotate-180' : ''} text-2xl`}
        />
      </div>
      {videos.map((video) => {
        if (video.category === category) {
          return (
            <div
              key={video.id}
              className={`py-2 px-4 cursor-pointer  ${
                !active ? 'hidden' : ''
              }`}>
              <button
                type='button'
                className='w-full text-start text-cblack'
                onClick={() => setCurrentVideo(video)}>
                {video.title}
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ContentList;
