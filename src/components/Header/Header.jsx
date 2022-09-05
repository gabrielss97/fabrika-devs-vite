/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Router
import { NavLink, Link } from 'react-router-dom';

// Icons
import {
  CgProfile,
  CgLogOut,
  CgPlayButtonR,
  CgUserList,
  CgFolder,
} from 'react-icons/cg';
import { RiAdminLine, RiSettings3Fill } from 'react-icons/ri';
import { HiUser } from 'react-icons/hi';

// Hooks
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Assets
import logo from '../../assets/logo-fabrica-devs.png';

const Header = ({ admin, user }) => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header>
      <div className='flex justify-between items-center bg-cWhite h-20 text-cWhite shadow-md p-4 md:p-8 border-b-1 border-cLtGray'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-12 md:w-14' />
        </Link>

        {user !== null && (
          <div
            className='w-12 h-12 md:w-14 md:h-14 rounded-full text-cWhtie text-center cursor-pointer relative'
            onClick={() => setShowModal(!showModal)}>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt='user'
                className='rounded-full shadow-md border-[3px] border-cGreen'
              />
            )}
            {!user.photoURL && (
              <div className='w-12 h-12 md:w-14 md:h-14 rounded-full shadow-sm flex justify-center items-center bg-cLtGray text-cDkGray'>
                <HiUser size={25} />
              </div>
            )}

            {/* MODAL */}

            {user && !admin && (
              <ul
                className={`${
                  showModal ? '' : 'hidden'
                } relative w-64 right-56 bg-cWhite text-cBlack shadow-lg border-1 border-cLtGray font-bold rounded-md mt-1 z-10`}>
                <NavLink to='/' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgPlayButtonR />
                    Conteúdo
                  </li>
                </NavLink>
                <NavLink to='/profile' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgProfile />
                    Perfil
                  </li>
                </NavLink>
                <NavLink
                  to='/'
                  onClick={handleLogout}
                  className='hover:text-cBlue'>
                  <li className='header-li border-none hover:text-cBlue px-16 py-2 w-full '>
                    <CgLogOut />
                    Sair
                  </li>
                </NavLink>
              </ul>
            )}
            {user && admin && (
              <ul
                className={`${
                  showModal ? '' : 'hidden'
                } relative w-80 right-72 bg-cWhite text-cBlack shadow-lg border-1 border-cLtGray font-bold rounded-md mt-1  z-10`}>
                <NavLink to='/' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <RiSettings3Fill />
                    Home
                  </li>
                </NavLink>
                <NavLink to='/panel/admins' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <RiAdminLine />
                    Painel de Admins
                  </li>
                </NavLink>
                <NavLink to='/panel/users' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgUserList />
                    Painel de Usuários
                  </li>
                </NavLink>
                <NavLink to='/panel/videos' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgPlayButtonR />
                    Painel de Vídeos
                  </li>
                </NavLink>
                <NavLink to='/panel/categories' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgFolder />
                    Categorias
                  </li>
                </NavLink>
                <NavLink to='/panel/profile' className='hover:text-cBlue'>
                  <li className='header-li'>
                    <CgProfile />
                    Perfil
                  </li>
                </NavLink>
                <NavLink
                  to='/'
                  onClick={handleLogout}
                  className='hover:text-cBlue'>
                  <li className='header-li border-none hover:text-cBlue px-16 py-2 w-full '>
                    <CgLogOut />
                    Sair
                  </li>
                </NavLink>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
