// Hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { documents: users } = useFetchDocuments('mailslist');

  const { createUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    const validateMail = users.filter((usr) => usr.email === email);
    if (validateMail.length === 0) {
      setError('Seu e-mail não está incluido na lista de usuários permitidos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    await createUser(user);
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    window.location.reload();
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
    <form
      onSubmit={handleSubmit}
      className='form justify-start md:justify-center'>
      <div className='w-full mx-auto text-center'>
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
          className='btn btn-disabled md:mt-8'
          disabled
        />
      )}
      {!loading && (
        <input type='submit' value='Registrar' className='btn md:mt-8' />
      )}
      {error && <p className='error'>{error}</p>}
      <p>
        Já possui uma conta?{' '}
        <Link to='/' className='text-cBlue font-bold hover:text-cLtBlue'>
          Entre
        </Link>
      </p>
    </form>
  );
};

export default Register;
