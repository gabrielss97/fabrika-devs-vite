// Icons
import {
  RiArrowDropDownLine,
  // RiCheckboxFill,
  // RiCheckboxBlankLine,
} from 'react-icons/ri';

// Hooks
import { useState, useEffect } from 'react';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

// import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
// import { useFetchDocument } from '../../../hooks/useFetchDocument';

// eslint-disable-next-line no-unused-vars
const Contents = ({ category, videos, setCurrentVideo, user }) => {
  // State para dimiuir e expandir os conteúdos
  const [active, setActive] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(true);
  const { documents } = useFetchDocuments('videos');

  const { state } = useDarkMode();

  useEffect(() => {
    if (documents) {
      const filter = documents.filter(
        (video) => video.category === category.toLowerCase()
      );

      setCategoryFilter(filter);
    }
  }, [documents]);

  // const { updateDocument } = useUpdateDocument('users');
  // const { document } = useFetchDocument('users', user.uid);
  // const [videosCheck, setVideosCheck] = useState(
  //   (document && document.videosChecked) || []
  // );

  // const handleCheckBox = (videoId) => {
  //   let videosChecked;
  //   if (
  //     document.videosChecked &&
  //     document.videosChecked.length >= 1 &&
  //     document.videosChecked.includes(videoId)
  //   ) {
  //     videosChecked = document.videosChecked.filter(
  //       (video) => video !== videoId
  //     );
  //   } else if (
  //     document.videosChecked &&
  //     document.videosChecked.length >= 1 &&
  //     !document.videosChecked.includes(videoId)
  //   ) {
  //     videosChecked = [...document.videosChecked, videoId];
  //   } else if (document.videosChecked.length === 0) {
  //     videosChecked = [videoId];
  //   }

  //   const data = {
  //     videosChecked,
  //   };

  //   setVideosCheck(videosChecked);

  //   updateDocument(user.uid, data);
  // };

  // useEffect(() => {
  //   if (document) {
  //     setVideosCheck(document.videosChecked);
  //   }
  // });

  if (categoryFilter.length === 0) {
    return;
  }

  return (
    <div className='w-full mx-auto'>
      <div
        onClick={() => setActive(!active)}
        className={`flex justify-between  text-cWhite font-bold cursor-pointer p-4 ${
          state.darkMode ? 'bg-cMdBlack' : 'bg-cMdWhite'
        }`}>
        <p
          className={`text-lg uppercase font-bold ${
            state.darkMode ? 'text-cWhite' : 'text-cBlue'
          }`}>
          {category}
        </p>
        <RiArrowDropDownLine
          className={`${active ? 'rotate-180' : ''} ${
            state.darkMode ? 'text-cWhite' : 'text-cBlue'
          } text-2xl`}
        />
      </div>

      {videos.map((video) => {
        if (video.category === category.toLowerCase()) {
          return (
            <div
              key={video.id}
              className={`flex gap-4 items-center p-4 cursor-pointer  ${
                !active ? 'hidden' : ''
              }`}>
              {/* {videosCheck && videosCheck.includes(video.id) ? (
                <RiCheckboxFill onClick={() => handleCheckBox(video.id)} />
              ) : (
                <RiCheckboxBlankLine onClick={() => handleCheckBox(video.id)} />
              )} */}

              <button
                type='button'
                className={`w-full text-start ${
                  state.darkMode ? 'text-cWhite' : 'text-cLtBlack'
                }`}
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
