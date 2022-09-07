// Icons
import { RiArrowDropDownLine } from 'react-icons/ri';

// Hooks
import { useState, useEffect } from 'react';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../../hooks/useFetchDocument';

const Contents = ({ category, videos, setCurrentVideo, user }) => {
  // State para dimiuir e expandir os conteúdos
  const [active, setActive] = useState(true);

  const { updateDocument } = useUpdateDocument('users');
  const { document } = useFetchDocument('users', user.uid);
  const [videosCheck, setVideosCheck] = useState(
    (document && document.videosChecked) || []
  );

  const handleCheckBox = (videoId) => {
    let videosChecked;
    if (
      document.videosChecked &&
      document.videosChecked.length >= 1 &&
      document.videosChecked.includes(videoId)
    ) {
      videosChecked = document.videosChecked.filter(
        (video) => video !== videoId
      );
    } else if (
      document.videosChecked &&
      document.videosChecked.length >= 1 &&
      !document.videosChecked.includes(videoId)
    ) {
      videosChecked = [...document.videosChecked, videoId];
    } else if (document.videosChecked.length === 0) {
      videosChecked = [videoId];
    }

    const data = {
      videosChecked,
    };

    setVideosCheck(videosChecked);

    updateDocument(user.uid, data);
  };

  useEffect(() => {
    if (document) {
      setVideosCheck(document.videosChecked);
    }
  }, [document, handleCheckBox]);

  return (
    <div className='w-full md:max-w-7xl mx-auto'>
      <div
        onClick={() => setActive(!active)}
        className=' flex justify-between  text-cBlue font-bold cursor-pointer p-2'>
        <p className=' text-lg uppercase font-bold'>{category}</p>
        <RiArrowDropDownLine
          className={`${active ? 'rotate-180' : ''} text-2xl`}
        />
      </div>

      {videos.map((video) => {
        if (video.category === category.toLowerCase()) {
          return (
            <div
              key={video.id}
              className={`flex gap-4 items-center py-2 px-4 cursor-pointer  ${
                !active ? 'hidden' : ''
              }`}>
              <input
                type='checkbox'
                onChange={() => handleCheckBox(video.id)}
              />

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

export default Contents;
