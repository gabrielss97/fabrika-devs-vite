// Icons
import { CgRemove } from 'react-icons/cg';
import { HiOutlinePencilAlt } from 'react-icons/hi';

// Hooks
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const CategoriesList = ({ categories }) => {
  const { deleteDocument } = useDeleteDocument('categories');

  if (categories === null) {
    return;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {categories.length > 0 &&
        categories
          .sort((a, b) => a.order - b.order)
          .map((category) => (
            <div
              key={category.id}
              className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
              <p className='text-xl font-bold text-cBlue'>{category.name}</p>
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
  );
};

export default CategoriesList;
