// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import AddCategorieForm from '../../components/AddCategorieForm/AddCategorieForm';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const CategoriesPanel = () => {
  const { documents: categories } = useFetchDocuments('categories');
  const [active, setActive] = useState(false);

  if (categories === null) {
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

      <div
        className={`${
          active
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddCategorieForm setActive={setActive} categories={categories} />
      </div>

      <CategoriesList categories={categories} />
    </div>
  );
};

export default CategoriesPanel;
