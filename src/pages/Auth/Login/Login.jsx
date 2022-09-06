// Hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

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
    <div className='flex flex-col items-center justify-center p-4 mt-16 md:w-1/2 lg:w-1/3 md:mx-auto'>
      <h1 className='text-2xl text-center text-cBlue mb-5 font-bold'>
        Entre para assisistir as aulas!
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-6 py-8 px-8 bg-cLtGray rounded-md w-full shadow-md'>
        <label htmlFor='email' className='form-label'>
          <span className='font-bold text-cBlue'>E-mail:</span>
          <input
            type='email'
            name='email'
            placeholder='Digite seu e-mail'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            className='form-input'
            autoComplete='on'
          />
        </label>
        <label htmlFor='password' className='form-label'>
          <span className='font-bold text-cBlue'>Senha:</span>
          <input
            type='password'
            name='password'
            placeholder='Digite sua senha'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            className='form-input'
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
        {error && <p>{error}</p>}
        <p>
          Não possui uma conta?{' '}
          <Link
            to='/register'
            className='text-cBlue font-bold hover:text-cLtBlue'>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
