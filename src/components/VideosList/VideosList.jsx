import React, { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const VideosList = () => {
  const { documents: videos, loading } = useFetchDocuments('videos');
  //   const [categories, setCategories] = useState([]);

  console.log(videos);
  //   useEffect(() => {
  //     if (videos) {
  //       const categoriesMap = videos.map((video) => video.category);
  //       const filterCategories = new Set(categoriesMap);

  //       setCategories(...filterCategories);
  //     }
  //   }, [videos]);

  return (
    <div>
      {videos && videos.map((video) => <p key={video.id}>{video.title}</p>)}
    </div>
  );
};

export default VideosList;
