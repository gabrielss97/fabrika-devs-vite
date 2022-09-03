/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/media-has-caption */

// Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useWindowSize } from '../../hooks/useWindowSize';

// Components
import ContentList from '../../components/ContentList/ContentList';

const Course = () => {
  const [currentVideo, setCurrentVideo] = useState({});

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
        <div className='flex'>
          {currentVideo !== null && (
            <div className='w-full'>
              <h1 className='font-bold text-3xl p-4'>{currentVideo.title}</h1>
              <div>
                <iframe
                  src={currentVideo.videoUrl}
                  className='h-96 w-full'
                  frameBorder='0'
                  title={currentVideo.title}
                />
              </div>
              <div className=' flex flex-col items-start gap-4 text-cDkGray p-4'>
                {currentVideo.files && (
                  <a href={currentVideo.files} target='_blank'>
                    <button
                      type='button'
                      className='download-btn cursor-pointer'>
                      Acessar Material
                    </button>
                  </a>
                )}
                <h2 className=' text-lg uppercase font-bold text-cBlack'>
                  Descrição:
                </h2>
                <p className='text-sm '>{currentVideo.description}</p>
              </div>
            </div>
          )}

          <div className='w-1/4 max-w-sm shadow-md heightCalc bg-cLtGray'>
            {categories &&
              categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                  <ContentList
                    category={category.name}
                    videos={videos}
                    setCurrentVideo={setCurrentVideo}
                    key={category.id}
                  />
                ))}
          </div>
        </div>
      )}
      {size[0] < 1024 && (
        <div>
          {currentVideo !== null && (
            <>
              <h1 className='font-bold text-3xl p-4'>{currentVideo.title}</h1>
              <div>
                <iframe
                  src={currentVideo.videoUrl}
                  className='h-72 w-full'
                  frameBorder='0'
                  title={currentVideo.title}
                />
              </div>
            </>
          )}

          <Tabs>
            <TabList>
              <Tab>Visão Geral</Tab>
              <Tab>Aulas</Tab>
            </TabList>

            <TabPanel>
              <div className=' flex flex-col items-start gap-4 text-cDkGray p-4'>
                {currentVideo.files && (
                  <a
                    href={currentVideo.files}
                    download={currentVideo.title}
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
                <p className='text-sm '>{currentVideo.description}</p>
              </div>
            </TabPanel>
            <TabPanel>
              {categories &&
                categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => (
                    <ContentList
                      category={category.name}
                      key={category.id}
                      videos={videos}
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

export default Course;
