// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const CategoriesPanel = () => {
  const { documents: categories, loading } = useFetchDocuments('categories');
  const { insertDocument } = useInsertDocument('categories');
  const { deleteDocument } = useDeleteDocument('categories');

  const [newCategory, setNewCategory] = useState('');
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      order: categories.length + 1,
      name: newCategory.toUpperCase(),
    };

    if (newCategory === '') {
      setError('Insira uma categoria!');
      return;
    }

    if (newCategory !== '') {
      insertDocument(data);
    }

    setNewCategory('');
    setActive(false);
  };

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <p> Carregando ...</p>;
  }

  return (
    <div className='p-4 flex flex-col'>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end '>
        Nova <BsPlusLg className='text-xl font-bold' />
      </button>
      {categories && (
        <>
          <div
            className={`${
              active
                ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
                : 'hidden'
            }`}>
            <form
              onSubmit={handleSubmit}
              className='form max-h-72 mt-60 md:mt-0 max-w-[90%] md:max-w-5xl mx-auto rounded-md'>
              <div className='flex justify-between items-center  w-full mx-auto text-2xl  font-bold text-cBlue '>
                <h1 className=' text-center'>Adicionar categoria</h1>
                <BiX
                  className='text-3xl cursor-pointer'
                  onClick={() => setActive(false)}
                />
              </div>
              <label htmlFor='newCategory' className='form-label'>
                <span className='w-1/4 font-bold text-cBlue'>
                  Nova categoria:
                </span>
                <input
                  type='text'
                  value={newCategory || ''}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className='form-input'
                />
              </label>
              <input type='submit' value='Adicionar' className='btn' />
              {error && <p className='error'>{error}</p>}
            </form>
          </div>
          <div className='w-full md:max-w-7xl mx-auto mt-8g'>
            {categories.length > 0 &&
              categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                  <div
                    key={category.id}
                    className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
                    <p className='text-xl font-bold text-cBlue'>
                      {category.name}
                    </p>
                    <div className='flex gap-4 text-xl'>
                      <button type='button'>
                        <HiOutlinePencilAlt className='text-cGreen' />
                      </button>
                      <button type='button'>
                        <CgRemove
                          className='text-cRed'
                          onClick={() => deleteDocument(category.id)}
                        />
                      </button>
                    </div>
                  </div>
                ))}
            {categories.length === 0 && <p>Nenhuma categoria cadastrada!</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesPanel;
