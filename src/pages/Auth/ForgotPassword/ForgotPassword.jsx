import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const {
    resetPassword,
    loading,
    error: resetError,
    message: resetMessage,
  } = useAuth();

  const sendPasswordResetEmail = (e) => {
    e.preventDefault();
    if (email) {
      resetPassword(email);
    }
  };

  useEffect(() => {
    if (resetError) {
      setError(resetError);
    }
    if (resetMessage) {
      setMessage(resetMessage);
    }
  }, [resetMessage, resetError]);

  // Remove o erro da tela em 3s
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    if (message !== '') {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [error, message]);

  return (
    <div className='flex items-center justify-center heightCalc'>
      <form onSubmit={sendPasswordResetEmail} className='form h-72'>
        <label htmlFor='email' className='form-label'>
          <span>E-mail:</span>
          <input
            type='email'
            name='email'
            className='form-input'
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {loading && (
          <input
            type='submit'
            value='Enviando...'
            className='btn btn-disabled'
          />
        )}
        {!loading && <input type='submit' value='Enviar' className='btn' />}
        {error && <p className='error'>{error}</p>}
        {message && <p className='success'>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
