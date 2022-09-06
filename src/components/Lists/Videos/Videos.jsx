import { v4 } from 'uuid';

// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';

// Hooks
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

const Videos = ({ setActive, setVideo }) => {
  // Fetch de todos os videos
  const { documents: videos, loading } = useFetchDocuments('videos');
  const { documents: categories } = useFetchDocuments('categories');

  // Função de deletar documentos
  const { deleteVideo } = useDeleteDocument('videos');

  const handleEdit = (video) => {
    setActive(true);
    setVideo(video);
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {videos && videos.length > 0 && (
        <div>
          {categories &&
            categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <div key={v4()} className='mb-8'>
                  <h1 className='text-cBlue text-2xl pl-2 uppercase font-bold mb-2'>
                    {category.name}
                  </h1>
                  {videos &&
                    videos.map((video) => {
                      if (video.category === category.name) {
                        return (
                          <div
                            key={v4()}
                            className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
                            <p className='w-3/4 text-cDkGray'>{video.title}</p>
                            <div className='flex gap-4 w-1/4 justify-end'>
                              <button
                                type='button'
                                className=' text-cGreen text-lg'>
                                <HiOutlinePencilAlt
                                  onClick={() => handleEdit(video)}
                                />
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

export default Videos;
