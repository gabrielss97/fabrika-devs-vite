// Components
import ContentList from '../../components/ContentList/ContentList';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

// Styles
import styles from './Course.module.scss';

// Mock
import categories from '../../mock';

const Course = () => (
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

export default Course;
