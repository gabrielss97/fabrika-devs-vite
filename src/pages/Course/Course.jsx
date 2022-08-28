// Components
import ContentList from '../../components/ContentList/ContentList';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

// Mock
import categories from '../../mock';

const Course = () => (
  <div>
    <VideoPlayer />

    <div>
      <h1>Conteúdo do Curso</h1>
      {categories &&
        categories.map((category) => (
          <ContentList category={category} key={category.id} />
        ))}
    </div>
  </div>
);

export default Course;
