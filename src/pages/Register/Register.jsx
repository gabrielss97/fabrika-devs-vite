// Hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    await createUser(user);
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className='form md:max-h-[500px]'>
      <div className='   w-full mx-auto text-center'>
        <h1 className='text-2xl  font-bold text-cBlue '>Cadastro</h1>
        <p>Entre para poder assistir as aulas!</p>
      </div>
      <label htmlFor='displayName' className='form-label'>
        <span className='font-bold text-cBlue w-full'>Nome:</span>
        <input
          type='text'
          name='displayName'
          required
          value={displayName || ''}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder='Digite seu nome'
          className='form-input'
          autoComplete='on'
        />
      </label>
      <label htmlFor='email' className='form-label'>
        <span className='font-bold text-cBlue w-full'>E-mail:</span>
        <input
          type='email'
          name='email'
          required
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite seu e-mail'
          className='form-input'
          autoComplete='on'
        />
      </label>
      <label htmlFor='password' className='form-label'>
        <span className='font-bold text-cBlue w-full'>Senha:</span>
        <input
          type='password'
          name='password'
          required
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Digite sua senha'
          className='form-input'
          autoComplete='on'
        />
      </label>
      <label htmlFor='confirmPassword' className='form-label'>
        <span className='font-bold text-cBlue w-full'>
          Confirmação de senha:
        </span>

        <input
          type='password'
          name='confirmPassword'
          required
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirme sua senha'
          className='form-input'
          autoComplete='on'
        />
      </label>
      {loading && (
        <input
          type='submit'
          value='Registrando...'
          className='btn btn-disabled'
          disabled
        />
      )}
      {!loading && <input type='submit' value='Registrar' className='btn' />}
      {error && <p className='error'>{error}</p>}
      <p>
        Já possui uma conta?{' '}
        <Link to='/login' className='text-cBlue font-bold hover:text-cLtBlue'>
          Entre
        </Link>
      </p>
    </form>
  );
};

export default Register;
