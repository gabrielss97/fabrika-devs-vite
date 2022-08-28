// Components
import ContentList from '../../components/ContentList/ContentList';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

// Styles
import styles from './Course.module.scss';

const Course = () => {
  const categories = [
    {
      id: 1,
      category: 'HTML',
      videos: [
        {
          id: 1,
          title: 'Aula 1',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 2,
          title: 'Aula 2',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 3,
          title: 'Aula 3',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 4,
          title: 'Aula 4',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
      ],
    },
    {
      id: 2,
      category: 'CSS',
      videos: [
        {
          id: 1,
          title: 'Aula 1',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 2,
          title: 'Aula 2',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 3,
          title: 'Aula 3',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 4,
          title: 'Aula 4',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
      ],
    },
    {
      id: 3,
      category: 'JS',
      videos: [
        {
          id: 1,
          title: 'Aula 1',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 2,
          title: 'Aula 2',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 3,
          title: 'Aula 3',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 4,
          title: 'Aula 4',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
      ],
    },
    {
      id: 4,
      category: 'React',
      videos: [
        {
          id: 1,
          title: 'Aula 1',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 2,
          title: 'Aula 2',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 3,
          title: 'Aula 3',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
        {
          id: 4,
          title: 'Aula 4',
          link: 'URL',
          description: 'Lorem Ipsum blalbnlalafdad',
        },
      ],
    },
  ];

  return (
    <div className={styles.course_container}>
      <VideoPlayer />

      <div className={styles.video_list}>
        <h1>Conteúdo do Curso</h1>
        {categories &&
          categories.map((category) => (
            <ContentList category={category} key={category.id} />
          ))}
      </div>
    </div>
  );
};

export default Course;
