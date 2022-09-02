import { v4 } from 'uuid';

// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';

// Hooks
import React, { useEffect, useState } from 'react';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const VideosList = () => {
  // State de categorias
  const [categories, setCategories] = useState([]);

  // Fetch de todos os videos
  const { documents: videos, loading } = useFetchDocuments('videos');

  // Função de deletar documentos
  const { deleteVideo } = useDeleteDocument('videos');

  // Quando houver um video, irá realizar um map e um set para pegar as categorias e não repeti-las
  useEffect(() => {
    if (videos) {
      const categoriesMap = videos.map((video) => video.category);
      const filterCategories = new Set(categoriesMap);

      setCategories([...filterCategories]);
    }
  }, [videos]);

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {videos && videos.length > 0 && (
        <div>
          {categories &&
            categories &&
            categories.map((category) => (
              <div key={v4()}>
                <h1 className='text-cBlue text-2xl pl-4 uppercase font-bold'>
                  {category}
                </h1>
                {videos &&
                  videos.map((video) => {
                    if (video.category === category) {
                      return (
                        <div
                          key={v4()}
                          className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
                          <p className='w-1/2 text-cDkGray'>{video.title}</p>
                          <div className='flex gap-4 w-1/4 justify-end'>
                            <button
                              type='button'
                              className=' text-cGreen text-lg'>
                              <HiOutlinePencilAlt />
                            </button>
                            <button
                              type='button'
                              className='text-cRed'
                              onClick={() =>
                                deleteVideo(
                                  video.id,
                                  video.videoname,
                                  video.filename
                                )
                              }>
                              <CgRemove />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            ))}
        </div>
      )}
      {videos && videos.length === 0 && (
        <p className='w-full  text-center text-lg mt-20'>
          Nenhum vídeo cadastrado.
        </p>
      )}
    </div>
  );
};

export default VideosList;
