// Icons
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Styles
import styles from './ContentList.module.scss';

const ContentList = ({ category }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.title_container}>
      <div onClick={() => setActive(!active)}>
        <h2>{category.category}</h2>
        <RiArrowDropDownLine className={active ? 'rotate' : ''} />
      </div>
      <div className={!active ? 'hide' : ''}>
        {category.videos &&
          category.videos.map((video) => <p key={video.id}>{video.title}</p>)}
      </div>
    </div>
  );
};

export default ContentList;
