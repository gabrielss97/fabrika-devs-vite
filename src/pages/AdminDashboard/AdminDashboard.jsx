// Links
import { Link } from 'react-router-dom';

// Icons
import { CgFolder, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiAdminLine } from 'react-icons/ri';

const AdminDashboard = () => {
  return (
    <nav className=' mx-auto max-w-5xl p-4 flex flex-col gap-4 mt-8'>
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
        to='/panel/categories'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <CgFolder className='text-2xl' />
        Categorias
      </Link>
      <Link
        to='/panel/videos'
        className='flex text-xl items-center gap-4 p-4 bg-cLtBlue rounded-lg text-cWhite font-bold shadow-lg'>
        <CgPlayButtonR className='text-2xl' />
        Vídeos
      </Link>
    </nav>
  );
};

export default AdminDashboard;
