// Hooks
import { useEffect, useState } from 'react';
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

    const res = await createUser(user);
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registro de usuário</h2>
        <label htmlFor='displayName'>
          <span>Nome:</span>
          <input
            type='text'
            name='displayName'
            required
            value={displayName || ''}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Digite seu nome'
            autoComplete='on'
          />
        </label>
        <label htmlFor='email'>
          <span>E-mail:</span>
          <input
            type='email'
            name='email'
            required
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu e-mail'
            autoComplete='on'
          />
        </label>
        <label htmlFor='password'>
          <span>Senha:</span>
          <input
            type='password'
            name='password'
            required
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Digite sua senha'
            autoComplete='on'
          />
        </label>
        <label htmlFor='confirmPassword'>
          <span>Confirmação de senha:</span>

          <input
            type='password'
            name='confirmPassword'
            required
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirme sua senha'
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

export default Register;
