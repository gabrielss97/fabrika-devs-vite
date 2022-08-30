// Hooks
import { useEffect, useState } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const AddVideoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  // const [filePath, setFilesPath] = useState(null);
  // const [videoPath, setVideoPath] = useState(null);

  const {
    uploadFile,
    error: uploadError,
    message: uploadMessage,
    loading,
    filePath,
    videoPath,
  } = useUpload();

  const { insertDocument, response } = useInsertDocument('videos');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleFileUpload = () => {
    uploadFile('files', fileUpload);
  };

  const handleVideoUpload = () => {
    uploadFile('videos', videoUpload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoPath === '' && title === '' && description === '') {
      setError('Por favor preencha todos os campos.');
    } else if (videoPath === '') {
      setError('Por envie um vídeo.');
    } else if (title === '') {
      setError('Por envie um título.');
    } else if (description === '') {
      setError('Por envie uma descrição.');
    }

    const video = {
      title,
      description,
      videoUrl: videoPath,
      files: filePath,
    };

    insertDocument(video);
  };

  useEffect(() => {
    if (uploadError) {
      setError(uploadError);
    }
    if (uploadMessage) {
      setMessage(uploadMessage);
    }
  }, [uploadError, uploadMessage]);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error, message]);

  return (
    <div className='flex flex-col items-center justify-center p-4 mt-16'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-6 py-8 px-8 bg-cLtGray rounded-md w-full shadow-md'>
        <h1 className='text-2xl text-cBlue mb-5 font-bold text-center'>
          Enviar vídeo
        </h1>
        <label htmlFor='title' className='form-label'>
          <span>Título:</span>
          <input
            type='text'
            name='title'
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Digite o título do seu vídeo'
            className='form-input'
            autoComplete='on'
          />
        </label>
        <label htmlFor='description' className='form-label '>
          <span>Descrição:</span>
          <textarea
            type='text'
            name='description'
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Digite a descrição do seu vídeo'
            className='form-input resize-none h-24'
            autoComplete='on'
          />
        </label>
        <label htmlFor='file' className='form-label'>
          <span>Material:</span>
          <div>
            <input
              type='file'
              name='file'
              // value={fileUpload || ''}
              // onChange={(e) => uploadFile('files', e.target.files[0])}
              onChange={(e) => setFileUpload(e.target.files[0])}
              className='form-input'
              autoComplete='on'
            />
            {filePath === '' && (
              <button
                type='button'
                onClick={handleFileUpload}
                className='text-center btn w-20 ml-10'>
                Enviar
              </button>
            )}
          </div>
        </label>
        <label htmlFor='video' className='form-label'>
          <span>Vídeo:</span>

          <div>
            <input
              type='file'
              name='video'
              // value={videoUpload || ''}
              onChange={(e) => setVideoUpload(e.target.files[0])}
              className='form-input'
              autoComplete='on'
            />
            {videoPath === '' && (
              <button
                type='button'
                onClick={handleVideoUpload}
                className='text-center btn w-20 ml-10'>
                Enviar
              </button>
            )}
          </div>
        </label>
        {loading && message && (
          <input
            type='submit'
            value={message}
            className='btn btn-disabled'
            disabled
          />
        )}
        {!loading && (
          <input type='submit' value='Cadastrar vídeo' className='btn' />
        )}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default AddVideoForm;
