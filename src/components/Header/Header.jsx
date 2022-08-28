// Router
import { NavLink, Link } from 'react-router-dom';

// Hooks
// import { useAuth } from '../../hooks/useAuth';

// Context
import { useAuthValue } from '../../context/AuthContext';

// Assets
import logo from '../../assets/logo-fabrica-devs.png';

const Header = () => {
  const { user } = useAuthValue();
  // const { logout } = useAuth();

  const admin = false;

  return (
    <header>
      <div className='flex'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <div>
          {!user && <NavLink to='/login'>Entrar</NavLink>}

          {user && (
            <div>
              <p>{'username'}</p>
              {/* <img src='' alt='userLogo' /> */}
              <div>IMG FAKE</div>
            </div>
          )}
        </div>

        {/* MODAL */}

        {user && !admin && (
          <ul>
            <li>
              <NavLink to='/course'>Curso</NavLink>
            </li>
            <li>
              <NavLink to='/profile'>Perfil</NavLink>
            </li>
            <li>
              <NavLink to='/profile/edit'>Editar Perfil</NavLink>
            </li>
          </ul>
        )}

        {user && admin && (
          <ul>
            <li>
              <NavLink to='/panel/users'>Usuários</NavLink>
            </li>
            <li>
              <NavLink to='/panel/video-upload'>Conteúdo</NavLink>
            </li>
            <li>
              <NavLink to='/panel/edit-profile'>Profile</NavLink>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
