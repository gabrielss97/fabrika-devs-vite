// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';

// Hooks
import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const CategoriesPanel = () => {
  const { documents: categories, loading } = useFetchDocuments('categories');
  const { insertDocument } = useInsertDocument('categories');
  const { deleteDocument } = useDeleteDocument('categories');

  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      order: categories.length + 1,
      name: newCategory,
    };

    if (newCategory !== '') {
      insertDocument(data);
    }

    setNewCategory('');
  };

  if (loading) {
    return <p> Carregando ...</p>;
  }

  return (
    <div>
      {categories && (
        <>
          <form
            onSubmit={handleSubmit}
            className='flex gap-4 p-4 md:max-w-5xl mx-auto mt-16  items-center '>
            <label htmlFor='newCategory' className='flex w-full items-center'>
              <span className='w-1/4'>Nova categoria:</span>
              <input
                type='text'
                value={newCategory || ''}
                onChange={(e) => setNewCategory(e.target.value)}
                className='form-input bg-cLtGray w-full'
              />
            </label>
            <input type='submit' value='Adicionar' className='btn' />
          </form>
          <div className='flex flex-col gap-4 p-4 md:max-w-5xl mx-auto mt-16'>
            {categories.length > 0 &&
              categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                  <div
                    key={category.id}
                    className='flex w-full bg-cLtGray p-4 rounded-md justify-between'>
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
