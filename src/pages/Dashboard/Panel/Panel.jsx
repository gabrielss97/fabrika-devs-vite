// Links
import { Link } from 'react-router-dom';

// Icons
import { CgFolder, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiAdminLine } from 'react-icons/ri';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const Panel = () => {
  const { state } = useDarkMode();

  return (
    <nav
      className={`w-full p-8 flex flex-col gap-4 heightCalc ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <Link
        to='/admins'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          state.darkMode ? 'bg-cLtBlack' : 'bg-cBlue'
        }`}>
        <RiAdminLine className='text-2xl' />
        Administradores
      </Link>
      <Link
        to='/users'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          state.darkMode ? 'bg-cLtBlack' : 'bg-cBlue'
        }`}>
        <CgUserList className='text-2xl' />
        Usuários
      </Link>
      <Link
        to='/categories'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          state.darkMode ? 'bg-cLtBlack' : 'bg-cBlue'
        }`}>
        <CgFolder className='text-2xl' />
        Categorias
      </Link>
      <Link
        to='/videos'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          state.darkMode ? 'bg-cLtBlack' : 'bg-cBlue'
        }`}>
        <CgPlayButtonR className='text-2xl' />
        Vídeos
      </Link>
    </nav>
  );
};

export default Panel;
