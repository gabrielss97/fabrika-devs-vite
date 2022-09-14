// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

// Components
import AddCategory from '../../../components/AddModal/AddCategory/AddCategory';
import EditCategory from '../../../components/EditModal/EditCategory/EditCategory';
import CategoriesList from '../../../components/Lists/Categories/Categories';

const Categories = () => {
  const { documents: categories } = useFetchDocuments('categories');

  const { state } = useDarkMode();

  const [activeAdd, setActiveAdd] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);

  const [category, setCategory] = useState({});

  if (categories === null) {
    return <p> Carregando ...</p>;
  }

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
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
        <AddCategory setActive={setActiveAdd} categories={categories} />
      </div>
      <div
        className={`${
          activeEdit
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <EditCategory setActive={setActiveEdit} category={category} />
      </div>

      <CategoriesList
        categories={categories}
        setActive={setActiveEdit}
        setCategory={setCategory}
      />
    </div>
  );
};

export default Categories;
