// Icons
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Styles

const ContentList = ({ category }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className=' flex justify-between text-cBlue font-bold cursor-pointer  bg-cLtGray rounded-md p-4 mb-1'>
        <h2 className='text-xl'>{category.category}</h2>
        <RiArrowDropDownLine
          className={`${active ? 'rotate-180' : ''} text-2xl`}
        />
      </div>
      <div className={!active ? 'hidden' : ''}>
        {category.videos &&
          category.videos.map((video) => (
            <p key={video.id} className='text-cDkGray p-2'>
              {video.title}
            </p>
          ))}
      </div>
    </>
  );
};

export default ContentList;
