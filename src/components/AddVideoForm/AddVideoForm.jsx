/* eslint-disable no-else-return */
// Hooks
import { useEffect, useState } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { useInsertDocument } from '../../hooks/useInsertDocument';

// Context
import { useAuthValue } from '../../context/AuthContext';

const AddVideoForm = () => {
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  // Messages States
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Pega os dados do usuário para inserir no objeto
  const { user } = useAuthValue();

  // Hook de Upload de arquivos
  const {
    uploadFile,
    clearPaths,
    error: uploadError,
    message: uploadMessage,
    fileLoading,
    videoLoading,
    filePath,
    videoPath,
  } = useUpload();

  // Hook de inserir documento no banco de dados
  const {
    insertDocument,
    error: insertError,
    loading: insertLoading,
  } = useInsertDocument('videos');

  // quando o usuario apertar o botao ira inserir o arquivo no storage e retornara um URL
  const handleFileUpload = async () => {
    uploadFile('files', fileUpload);
  };

  // quando o usuario apertar o botao ira inserir o arquivo no storage e retornara um URL
  const handleVideoUpload = () => {
    uploadFile('videos', videoUpload);
  };

  // Função de envio do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida os campos
    if (videoPath === '' && title === '' && description === '') {
      setError('Por favor preencha todos os campos.');
      return;
    } else if (title === '') {
      setError('Por envie um título.');
      return;
    } else if (description === '') {
      setError('Por envie uma descrição.');
      return;
    } else if (videoPath === '') {
      setError('Por envie um vídeo.');
      return;
    }

    // Cria o objeto que será inserido no banco de dados
    const video = {
      title,
      description,
      videoUrl: videoPath,
      files: filePath,
      uid: user.uid,
      createdBy: user.email,
    };

    insertDocument(video);

    setError('');
    setMessage('');
    setDescription('');
    setTitle('');
    setVideoUpload(null);
    setFileUpload(null);
    clearPaths();
  };

  // Se houver algum erro ou mensagem no upload, atualiza o state com o erro ou msg do upload
  useEffect(() => {
    if (uploadError) {
      setError(uploadError);
    }
    if (uploadMessage) {
      setMessage(uploadMessage);
    }
    if (insertError) {
      setError(insertError);
    }
  }, [uploadError, uploadMessage, insertError]);

  // Remove o erro da tela em 3s
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    if (message !== '') {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [error, message]);

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center gap-5 py-8 px-4 bg-cLtGray  rounded-t-md w-full shadow-md'>
      <h1 className='text-2xl text-cBlue  font-bold text-center'>
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
        <div className='flex'>
          <input
            type='file'
            name='file'
            // onChange={(e) => uploadFile('files', e.target.files[0])}
            onChange={(e) => setFileUpload(e.target.files[0])}
            className='form-input text-sm max-w-full'
            autoComplete='on'
            disabled={filePath !== '' && fileUpload !== null}
          />
          {filePath === '' && (
            <button
              type='button'
              onClick={handleFileUpload}
              className='text-left px-2 ml-10 b-1 bg-cLtBlue rounded text-cWhite'>
              {!fileLoading && 'Enviar'}
              {fileLoading && 'Enviando...'}
            </button>
          )}
        </div>
      </label>
      <label htmlFor='video' className='form-label'>
        <span>Vídeo:</span>

        <div className='flex'>
          <input
            type='file'
            name='video'
            onChange={(e) => setVideoUpload(e.target.files[0])}
            className='form-input text-sm max-w-full'
            autoComplete='on'
            disabled={videoPath !== '' && videoUpload !== null}
          />
          {videoPath === '' && (
            <button
              type='button'
              onClick={handleVideoUpload}
              className='text-left px-2 ml-10 b-1 bg-cLtBlue rounded text-cWhite'>
              {!videoLoading && 'Enviar'}
              {videoLoading && 'Enviando...'}
            </button>
          )}
        </div>
      </label>

      {!error && !insertLoading && (
        <input type='submit' value='Cadastrar vídeo' className='btn' />
      )}
      {insertLoading && (
        <input type='submit' value='Cadastrando...' className='btn' />
      )}
      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default AddVideoForm;
