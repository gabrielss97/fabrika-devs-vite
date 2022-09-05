// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import AddCategorieForm from '../../components/AddCategorieForm/AddCategorieForm';
import EditCategoryForm from '../../components/EditCategoryForm/EditCategoryForm';
import CategoriesList from '../../components/CategoriesList/CategoriesList';

const CategoriesPanel = () => {
  const { documents: categories } = useFetchDocuments('categories');
  const [activeAdd, setActiveAdd] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);

  const [category, setCategory] = useState({});

  if (categories === null) {
    return <p> Carregando ...</p>;
  }

  return (
    <div className='p-4 flex flex-col'>
      <button
        type='button'
        onClick={() => setActiveAdd(!activeAdd)}
        className='cursor-pointer bg-cBlue text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end '>
        Nova <BsPlusLg className='text-xl font-bold' />
      </button>

      <div
        className={`${
          activeAdd
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddCategorieForm setActive={setActiveAdd} categories={categories} />
      </div>
      <div
        className={`${
          activeEdit
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <EditCategoryForm setActive={setActiveEdit} category={category} />
      </div>

      <CategoriesList
        categories={categories}
        setActive={setActiveEdit}
        setCategory={setCategory}
      />
    </div>
  );
};

export default CategoriesPanel;
