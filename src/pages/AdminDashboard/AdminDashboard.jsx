// Links
import { Link } from 'react-router-dom';

// Icons
import { CgFolderAdd, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiAdminLine } from 'react-icons/ri';

const AdminDashboard = () => {
  return (
    <nav className='heightCalc-noscroll md:w-1/5 bg-cLtGray shadow-md p-4 flex flex-col gap-4'>
      <Link
        to='/panel/admins'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <RiAdminLine className='text-2xl' />
        Administradores
      </Link>
      <Link
        to='/panel/users'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <CgUserList className='text-2xl' />
        Usuários
      </Link>
      <Link
        to='/panel/videos'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <CgPlayButtonR className='text-2xl' />
        Vídeos
      </Link>
      <Link
        to='/panel/categories'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <CgFolderAdd className='text-2xl' />
        Categorias
      </Link>
    </nav>
  );
};

export default AdminDashboard;
