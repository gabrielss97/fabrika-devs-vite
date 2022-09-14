/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/media-has-caption */

// Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useWindowSize } from '../../hooks/useWindowSize';

// Context
import { useDarkMode } from '../../context/DarkModeContext';

// Components
import Contents from '../../components/Lists/Contents/Contents';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const Content = ({ user }) => {
  const [currentVideo, setCurrentVideo] = useState({});

  const { state } = useDarkMode();

  const size = useWindowSize();

  // Fetch de todos os videos
  const { documents: videos, loading } = useFetchDocuments('videos');
  const { documents: categories } = useFetchDocuments('categories');

  useEffect(() => {
    if (videos) {
      setCurrentVideo(videos[0]);
    }
  }, [videos]);

  if (categories === null) {
    return;
  }
  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <>
      {size[0] > 1024 && (
        <div
          className={`flex ${
            state.darkMode ? ' bg-cMdBlack ' : 'bg-cMdWhite'
          }`}>
          {currentVideo !== null && (
            <div className='w-full'>
              <div>
                <VideoPlayer video={currentVideo} />
              </div>
              <div className='flex flex-col items-start gap-4 p-4'>
                {currentVideo && currentVideo.files && (
                  <a href={currentVideo && currentVideo.files} target='_blank'>
                    <button
                      type='button'
                      className='download-btn cursor-pointer'>
                      Acessar Material
                    </button>
                  </a>
                )}
                <h2
                  className={`text-lg uppercase font-bold ${
                    state.darkMode ? 'text-cDkWhite ' : ' text-cBlue'
                  }`}>
                  Descrição:
                </h2>
                <p
                  className={`text-sm ${
                    state.darkMode ? 'text-cDkWhite ' : ' text-cLtBlack'
                  }`}>
                  {currentVideo && currentVideo.description}
                </p>
              </div>
            </div>
          )}

          <div
            className={`w-1/4 max-w-sm shadow-md heightCalc ${
              state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
            }`}>
            {categories &&
              categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                  <Contents
                    category={category.name}
                    videos={videos}
                    setCurrentVideo={setCurrentVideo}
                    user={user}
                    key={category.id}
                  />
                ))}
          </div>
        </div>
      )}
      {size[0] < 1024 && (
        <div
          className={` heightCalc ${
            state.darkMode ? ' bg-cLtBlack' : 'bg-cWhite'
          }`}>
          {currentVideo !== null && <VideoPlayer video={currentVideo} />}

          <Tabs>
            <TabList>
              <Tab
                style={
                  state.darkMode
                    ? { background: '#121212' }
                    : { background: '#ffffff' }
                }>
                Visão Geral
              </Tab>
              <Tab
                style={
                  state.darkMode
                    ? { background: '#121212' }
                    : { background: '#ffffff' }
                }>
                Aulas
              </Tab>
            </TabList>

            <TabPanel>
              <div
                className={`flex flex-col items-start gap-4 p-4 ${
                  state.darkMode ? 'text-cWhite' : 'text-cDkGray'
                }`}>
                {currentVideo && currentVideo.files && (
                  <a
                    href={currentVideo && currentVideo.files}
                    download={currentVideo && currentVideo.title}
                    target='_blank'>
                    <button
                      type='button'
                      className='download-btn cursor-pointer'>
                      Baixar Material
                    </button>
                  </a>
                )}
                <h2 className=' text-lg uppercase font-bold text-cBlack'>
                  Descrição:
                </h2>
                <p className='text-sm '>
                  {currentVideo && currentVideo.description}
                </p>
              </div>
            </TabPanel>
            <TabPanel>
              {categories &&
                categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <Contents
                      category={category.name}
                      key={category.id}
                      videos={videos}
                      user={user}
                      setCurrentVideo={setCurrentVideo}
                    />
                  ))}
            </TabPanel>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Content;
