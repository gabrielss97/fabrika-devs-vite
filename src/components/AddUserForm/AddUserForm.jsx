// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AddUserForm = ({ setActive }) => {
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
    setActive(false);
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
      <div className='flex justify-between items-center  w-full mx-auto text-2xl  font-bold text-cBlue'>
        <h1 className=' text-center'>Cadastrar usuário</h1>
        <BiX
          className='text-3xl cursor-pointer'
          onClick={() => setActive(false)}
        />
      </div>
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
  );
};

export default AddUserForm;
