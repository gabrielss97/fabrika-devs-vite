// Routes
import { Link } from 'react-router-dom';

// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const { state } = useDarkMode();

  const { login, error: AuthError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (AuthError) {
      setError(AuthError);
    }
  }, [AuthError]);

  return (
    <div
      className={`heightCalc flex flex-col items-center justify-center w-full p-4 ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <form
        onSubmit={handleSubmit}
        className={`form ${state.darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'}`}>
        <label htmlFor='email' className='form-label'>
          <h1
            className={`text-2xl text-center mb-5 font-bold ${
              state.darkMode ? 'text-cWhite' : 'text-cBlue'
            }`}>
            Entre para assisistir as aulas!
          </h1>
          <span
            className={`font-bold  ${
              state.darkMode ? 'text-cWhite' : 'text-cBlue'
            }`}>
            E-mail:
          </span>
          <input
            type='email'
            name='email'
            placeholder='Digite seu e-mail'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${
              state.darkMode
                ? 'bg-cDkBlack text-cWhite'
                : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        <label htmlFor='password' className='form-label'>
          <span
            className={`font-bold  ${
              state.darkMode ? 'text-cWhite' : 'text-cBlue'
            }`}>
            Senha:
          </span>
          <input
            type='password'
            name='password'
            placeholder='Digite sua senha'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${
              state.darkMode
                ? 'bg-cDkBlack text-cWhite'
                : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        {!loading && (
          <input
            type='submit'
            value='Entrar'
            className='btn w-full mt-4 hover:bg-cLtBlue transition-all'
          />
        )}
        {loading && (
          <input
            type='submit'
            value='Entrando...'
            disabled
            className='btn w-full mt-4 bg-cDkGray text-cWhite transition-all'
          />
        )}
        {error && <p className='error'>{error}</p>}
        <p
          className={`flex gap-4 ${
            state.darkMode ? 'text-cWhite' : 'text-cLtBlack'
          }`}>
          Esqueceu sua senha?
          <Link
            to='/forgot-password'
            className='text-cBlue font-bold hover:text-cCian'>
            Redefinir
          </Link>
        </p>
        <p
          className={`flex gap-4 ${
            state.darkMode ? 'text-cWhite' : 'text-cLtBlack'
          }`}>
          Não possui uma conta?
          <Link
            to='/register'
            className='text-cBlue font-bold hover:text-cCian'>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
