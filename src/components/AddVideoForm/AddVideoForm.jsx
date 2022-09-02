/* eslint-disable no-else-return */
// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useUploadDocument } from '../../hooks/useUploadDocument';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Context
import { useAuthValue } from '../../context/AuthContext';

const AddVideoForm = ({ setActive }) => {
  // Form States
  const [category, setCategory] = useState('html');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  // Messages States
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Pega os dados do usuário para inserir no objeto
  const { user } = useAuthValue();

  // Pega os dados da collection de videos para retornar o length
  const { documents: videos } = useFetchDocuments('videos');

  // Hook de Upload de arquivos
  const {
    uploadDocument,
    clearPaths,
    error: uploadError,
    message: uploadMessage,
    fileLoading,
    videoLoading,
    filePath,
    videoPath,
    fileName,
    videoName,
  } = useUploadDocument();

  // Hook de inserir documento no banco de dados
  const {
    insertDocument,
    error: insertError,
    loading: insertLoading,
  } = useInsertDocument('videos');

  // quando o usuario apertar o botao ira inserir o arquivo no storage e retornara um URL
  const handleFileUpload = async () => {
    uploadDocument('files', fileUpload);
  };

  // quando o usuario apertar o botao ira inserir o arquivo no storage e retornara um URL
  const handleVideoUpload = () => {
    uploadDocument('videos', videoUpload);
  };

  // Função de envio do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida os campos
    if (
      category === '' &&
      videoPath === '' &&
      title === '' &&
      description === ''
    ) {
      setError('Por favor preencha todos os campos.');
      return;
    } else if (category === '') {
      setError('Por escolha uma categoria.');
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
      order: videos.length + 1,
      category,
      title,
      description,
      videoUrl: videoPath,
      files: filePath,
      uid: user.uid,
      createdBy: user.email,
      filename: fileName,
      videoname: videoName,
    };

    insertDocument(video);

    setError('');
    setMessage('');
    setDescription('');
    setTitle('');
    setVideoUpload(null);
    setFileUpload(null);
    clearPaths();
    document.getElementById('inputFile').value = '';
    document.getElementById('inputVideo').value = '';
    setActive(false);
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
    <form onSubmit={handleSubmit} className='form'>
      <div className='flex justify-between items-center  w-full mx-auto text-2xl  font-bold text-cBlue '>
        <h1 className=' text-center'>Enviar vídeo</h1>
        <BiX
          className='text-3xl cursor-pointer'
          onClick={() => setActive(false)}
        />
      </div>
      <label htmlFor='category' className='form-label'>
        <span>Categoria:</span>
        <select
          name='category'
          className='form-input'
          vaue={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value='html'>HTML</option>
          <option value='css'>CSS</option>
          <option value='javascript'>JavaScript</option>
          <option value='reactjs'>React JS</option>
          <option value='github'>GitHub</option>
          <option value='linkedin'>Linkedin</option>
        </select>
      </label>
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
        <div className='flex items-center'>
          <input
            type='file'
            name='file'
            id='inputFile'
            // onChange={(e) => uploadFile('files', e.target.files[0])}
            onChange={(e) => setFileUpload(e.target.files[0])}
            className='form-input text-sm max-w-full'
            disabled={filePath !== '' && fileUpload !== null}
          />
          {filePath === '' && (
            <button
              type='button'
              onClick={handleFileUpload}
              className={`text-left px-2 py-1 font-bold ml-10 b-1 ${
                fileLoading
                  ? 'bg-cDkGray'
                  : ' bg-cLtBlue hover:bg-cBlue transition'
              } rounded-3xl text-cWhite shadow-md border-1 border-cBlue`}>
              {!fileLoading && 'Enviar'}
              {fileLoading && 'Enviando...'}
            </button>
          )}
        </div>
      </label>
      <label htmlFor='video' className='form-label'>
        <span>Vídeo:</span>

        <div className='flex items-center'>
          <input
            type='file'
            id='inputVideo'
            name='video'
            onChange={(e) => setVideoUpload(e.target.files[0])}
            className='form-input text-sm max-w-full'
            disabled={videoPath !== '' && videoUpload !== null}
          />
          {videoPath === '' && (
            <button
              type='button'
              onClick={handleVideoUpload}
              className={`text-left px-2 py-1 font-bold ml-10 b-1 ${
                videoLoading
                  ? 'bg-cDkGray'
                  : ' bg-cLtBlue hover:bg-cBlue transition'
              } rounded-3xl text-cWhite shadow-md border-1 border-cBlue`}>
              {!videoLoading && 'Enviar'}
              {videoLoading && 'Enviando...'}
            </button>
          )}
        </div>
      </label>

      {!error && !insertLoading && !videoLoading && !fileLoading && (
        <input type='submit' value='Cadastrar vídeo' className='btn' />
      )}
      {insertLoading && (
        <input
          type='submit'
          value='Cadastrando...'
          className='btn  bg-cDkGray'
          disabled
        />
      )}
      {fileLoading && !videoLoading && (
        <input
          type='submit'
          value='Aguarde'
          className='btn bg-cDkGray'
          disabled
        />
      )}
      {videoLoading && (
        <input
          type='submit'
          value='Aguarde'
          className='btn bg-cDkGray'
          disabled
        />
      )}
      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default AddVideoForm;
