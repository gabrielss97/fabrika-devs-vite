/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Router
import { NavLink, Link } from 'react-router-dom';

// Icons
import { CgProfile, CgLogOut, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiSettings3Fill } from 'react-icons/ri';

// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Context
import { useAuthValue } from '../../context/AuthContext';

// Assets
import logo from '../../assets/logo-fabrica-devs.png';
import userDefault from '../../assets/user.png';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Header = ({ admin }) => {
  const { user } = useAuthValue();
  const { document: userProfile } = useFetchDocument('users', user.uid);
  const { logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [userImage, setUserImage] = useState(false);

  useEffect(() => {
    if (userProfile) {
      if (userProfile.userImage) {
        setUserImage(userProfile.userImage);
      }
    }
  }, [userProfile]);

  return (
    <header>
      <div className='flex justify-between items-center bg-cWhite h-20 text-cWhite shadow-md p-4 border-b-1 border-cLtGray'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-14' />
        </Link>
        <div>
          {!user && <NavLink to='/login'>Entrar</NavLink>}

          {user && (
            <div
              className='w-12 h-12 rounded-full text-cWhtie text-center cursor-pointer relative'
              onClick={() => setShowModal(!showModal)}>
              {userImage && (
                <img src={userImage} alt='user' className='rounded-full' />
              )}
              {!userImage && <img src={userDefault} alt='user' />}
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
                  <NavLink to='/' onClick={logout} className='hover:text-cBlue'>
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
                      Dashboard
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
                  <NavLink to='/panel/profile' className='hover:text-cBlue'>
                    <li className='header-li'>
                      <CgProfile />
                      Perfil
                    </li>
                  </NavLink>
                  <NavLink to='/' onClick={logout} className='hover:text-cBlue'>
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
      </div>
    </header>
  );
};

export default Header;
