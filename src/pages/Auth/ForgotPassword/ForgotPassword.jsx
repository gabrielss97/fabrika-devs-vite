// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { state } = useDarkMode();

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
    <div
      className={`heightCalc flex flex-col items-center justify-center w-full p-4 ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <form
        onSubmit={sendPasswordResetEmail}
        className={`form ${state.darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'}`}>
        <label htmlFor='email' className='form-label'>
          <span
            className={`text-2xl text-start mb-5 font-bold ${
              state.darkMode ? 'text-cWhite' : 'text-cBlue'
            }`}>
            E-mail:
          </span>
          <input
            type='email'
            name='email'
            className={`form-input ${
              state.darkMode
                ? 'bg-cDkBlack text-cWhite'
                : 'bg-cWhite text-cDkBlack'
            }`}
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
