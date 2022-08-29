// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AddUserForm = () => {
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
    <div className='flex flex-col items-center justify-center p-4 mt-16'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-6 py-8 px-8 bg-cLtGray rounded-md w-full shadow-md'>
        <h1 className='text-2xl text-cBlue mb-5 font-bold text-center'>
          Registro de usuário
        </h1>
        <label htmlFor='displayName' className='form-label'>
          <span>Nome:</span>
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
          <span>E-mail:</span>
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
          <span>Senha:</span>
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
          <span>Confirmação de senha:</span>

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
      </form>
    </div>
  );
};

export default AddUserForm;
