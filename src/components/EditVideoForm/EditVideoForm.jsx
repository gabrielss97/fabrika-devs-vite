/* eslint-disable no-else-return */
// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const EditVideoForm = ({ setActive, video }) => {
  // Form States
  const [newCategory, setNewCategory] = useState('html');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Messages States
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Pega as categorias
  const { documents: categories } = useFetchDocuments('categories');

  // Hook de Upload de arquivos

  // Função de envio do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida os campos
    if (newCategory === '' && title === '' && description === '') {
      setError('Por favor preencha todos os campos.');
      return;
    } else if (newCategory === '') {
      setError('Por escolha uma categoria.');
      return;
    } else if (title === '') {
      setError('Por envie um título.');
      return;
    } else if (description === '') {
      setError('Por envie uma descrição.');
      return;
    }

    // Cria o objeto que será inserido no banco de dados
    const videoData = {
      category: newCategory,
      title,
      description,
    };

    setError('');
    setMessage('');
    setDescription('');
    setTitle('');

    setActive(false);
  };

  // Se houver algum erro ou mensagem no upload, atualiza o state com o erro ou msg do upload

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
        <span className='font-bold text-cBlue w-full'>Categoria:</span>
        <select
          name='category'
          className='form-input'
          vaue={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}>
          {categories &&
            categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
        </select>
      </label>
      <label htmlFor='title' className='form-label'>
        <span className='font-bold text-cBlue w-full'>Título:</span>
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
        <span className='font-bold text-cBlue w-full'>Descrição:</span>
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

      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default EditVideoForm;
