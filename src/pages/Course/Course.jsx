/* eslint-disable jsx-a11y/media-has-caption */
// Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

// Components
import ContentList from '../../components/ContentList/ContentList';
import VideoTest from '../../assets/videotest.mp4';

// Mock
import categories from '../../mock';

const Course = () => {
  const DB = {
    id: '1',
    title: 'Aula 1 - Introdução ao HTML',
    video: VideoTest,
    description: 'Aula de introdução ao curso',
    files: 'Gabriel.pdf',
  };

  return (
    <div>
      <h1 className='font-bold text-3xl p-4'>{DB.title}</h1>

      <div>
        <video className='h-72 w-full' controls>
          <source src={DB.video} type='video/mp4' />
        </video>
      </div>

      <Tabs>
        <TabList>
          <Tab>Visão Geral</Tab>
          <Tab>Aulas</Tab>
        </TabList>

        <TabPanel>
          <div className='p-4 flex flex-col items-start gap-4 bg-cLtGray'>
            <button type='button' className='download-btn'>
              Baixar arquivos
            </button>
            <h2 className='text-xl'>Descrição:</h2>
            <p className='text-sm '>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              laudantium perferendis officia expedita esse, repellat modi ullam
              id possimus harum voluptatem qui distinctio sint culpa nihil
              veniam itaque. Fugiat, repudiandae.
            </p>
          </div>
        </TabPanel>
        <TabPanel className='p-4'>
          {categories &&
            categories.map((category) => (
              <ContentList category={category} key={category.id} />
            ))}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Course;
