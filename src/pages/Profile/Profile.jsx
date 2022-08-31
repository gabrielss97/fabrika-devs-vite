// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocument } from '../../hooks/useFetchDocument';

import userDefault from '../../assets/user.png';
import { useAuth } from '../../hooks/useAuth';

const Profile = ({ user }) => {
  const { document: userProfile } = useFetchDocument('users', user.uid);
  const { updateUserPassword, error: authError } = useAuth();

  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (userProfile) {
      if (userProfile.imageUrl) {
        setUserImage(userProfile.imageUrl);
      }
      if (userProfile.name) {
        setUserName(userProfile.name);
      }
      if (user.email) {
        setUserEmail(user.email);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Por favor, insira senhas iguais.');
    }

    if (password === confirmPassword) {
      updateUserPassword(user, password);
    }
  };

  return (
    <div>
      <div className='p-4 flex flex-col  items-center mx-auto w-full'>
        <form
          onSubmit={handleSubmit}
          className='w-full  flex flex-col  items-center'
          // className='form min-h-[900px] justify-start'
        >
          {userImage && <img src={userImage} alt={userName} className='w-60' />}
          {!userImage && <img src={userDefault} alt='user' className='w-60' />}
          <label className='form-label' htmlFor='username'>
            <span>Nome:</span>
            <input
              className='form-input'
              name='username'
              type='text'
              value={userName || ''}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label className='form-label' htmlFor='image'>
            <span>Foto de perfil:</span>
            <input
              className='form-input'
              name='image'
              type='text'
              value={userImage || ''}
              onChange={(e) => setUserImage(e.target.value)}
            />
          </label>

          <label className='form-label' htmlFor='email'>
            <span>E-mail:</span>
            <input
              className='form-input'
              name='email'
              type='email'
              value={userEmail || ''}
              disabled
            />
          </label>
          <label className='form-label' htmlFor='password'>
            <span>Alterar senha:</span>
            <input
              className='form-input'
              name='password'
              type='password'
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className='form-label' htmlFor='confirmPassword'>
            <span>Confirmar senha:</span>
            <input
              className='form-input'
              name='confirmPassword'
              type='password'
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <input type='submit' value='Atualizar dados' className='btn  mt-8' />
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
