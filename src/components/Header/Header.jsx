/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Router
import { NavLink, Link } from 'react-router-dom';

// Icons
import { CgProfile, CgLogOut, CgPlayButtonR, CgUserList } from 'react-icons/cg';

// Hooks
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Context
import { useAuthValue } from '../../context/AuthContext';

// Assets
import logo from '../../assets/logo-fabrica-devs.png';
import userDefault from '../../assets/user.png';

const Header = ({ admin }) => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuthValue();
  const { logout } = useAuth();

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
              <img src={userDefault} alt='user' />
              {/* MODAL */}
              {user && !admin && (
                <ul
                  className={`${
                    showModal ? '' : 'hidden'
                  } relative w-64 right-56 bg-cWhite text-cBlack shadow-lg border-1 border-cLtGray font-bold rounded-md mt-1 z-10`}>
                  <li className='header-li'>
                    <CgPlayButtonR />
                    <NavLink to='/' className='hover:text-cBlue'>
                      Conteúdo
                    </NavLink>
                  </li>
                  <li className='header-li'>
                    <CgProfile />
                    <NavLink to='/profile' className='hover:text-cBlue'>
                      Perfil
                    </NavLink>
                  </li>
                  <li className='header-li border-none hover:text-cBlue px-16 py-2 w-full '>
                    <CgLogOut />

                    <NavLink
                      to='/'
                      onClick={logout}
                      className='hover:text-cBlue'>
                      Sair
                    </NavLink>
                  </li>
                </ul>
              )}
              {user && admin && (
                <ul
                  className={`${
                    showModal ? '' : 'hidden'
                  } relative w-80 right-72 bg-cWhite text-cBlack shadow-lg border-1 border-cLtGray font-bold rounded-md mt-1  z-10`}>
                  <li className='header-li'>
                    <CgUserList />
                    <NavLink to='/panel/users' className='hover:text-cBlue'>
                      Painel de Usuários
                    </NavLink>
                  </li>
                  <li className='header-li'>
                    <CgPlayButtonR />

                    <NavLink to='/panel/videos' className='hover:text-cBlue'>
                      Painel de Vídeos
                    </NavLink>
                  </li>
                  <li className='header-li'>
                    <CgProfile />

                    <NavLink to='/panel/profile' className='hover:text-cBlue'>
                      Perfil
                    </NavLink>
                  </li>
                  <li className='header-li border-none hover:text-cBlue px-16 py-2 w-full '>
                    <CgLogOut />

                    <NavLink
                      to='/'
                      onClick={logout}
                      className='hover:text-cBlue'>
                      Sair
                    </NavLink>
                  </li>
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
