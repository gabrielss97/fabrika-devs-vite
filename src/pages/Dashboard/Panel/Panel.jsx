// Links
import { Link } from 'react-router-dom';

// Icons
import { CgFolder, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiAdminLine } from 'react-icons/ri';

const Panel = () => {
  return (
    <nav className=' mx-auto max-w-5xl p-4 flex flex-col gap-4 mt-8'>
      <Link
        to='/admins'
        className='flex text-xl items-center gap-4 p-4 bg-cBlue rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300'>
        <RiAdminLine className='text-2xl' />
        Administradores
      </Link>
      <Link
        to='/users'
        className='flex text-xl items-center gap-4 p-4 bg-cBlue rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300'>
        <CgUserList className='text-2xl' />
        Usuários
      </Link>
      <Link
        to='/categories'
        className='flex text-xl items-center gap-4 p-4 bg-cBlue rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300'>
        <CgFolder className='text-2xl' />
        Categorias
      </Link>
      <Link
        to='/videos'
        className='flex text-xl items-center gap-4 p-4 bg-cBlue rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300'>
        <CgPlayButtonR className='text-2xl' />
        Vídeos
      </Link>
    </nav>
  );
};

export default Panel;
