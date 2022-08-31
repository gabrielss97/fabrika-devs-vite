// Hooks
import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const CategoriesPanel = () => {
  const { documents: categories, loading } = useFetchDocuments('categories');
  const { insertDocument, loading: insertLoading } =
    useInsertDocument('categories');

  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: categories.length + 1,
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
          <form onSubmit={handleSubmit}>
            <label htmlFor='newCategory'>
              <span>Nova categoria:</span>
              <input
                type='text'
                value={newCategory || ''}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </label>
            <input type='submit' value='Adicionar' />
          </form>
          <div>
            {categories.length > 0 &&
              categories
                .sort((a, b) => a.id - b.id)
                .map((category) => (
                  <div key={category.id} className='flex gap-4'>
                    <p>{category.name}</p>
                    <div className='flex gap-4'>
                      <button>edit</button>
                      <button>delete</button>
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
