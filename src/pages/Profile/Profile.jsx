// Icons
import { HiUser } from 'react-icons/hi';

// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const Profile = ({ user }) => {
  const { document: userProfile } = useFetchDocument('users', user.uid);
  const { updateUserPassword, error: authError, updateUserImage } = useAuth();
  const { updateDocument, response } = useUpdateDocument('users');

  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) {
        setUserName(userProfile.name);
      }
      if (user.photoURL) {
        setUserImage(user.photoURL);
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
      return;
    }

    const data = {
      userName,
    };

    updateDocument(user.uid, data);

    if (userImage !== '') {
      updateUserImage(user, userImage);
    }

    if (password === confirmPassword) {
      updateUserPassword(user, password);
    }

    setMessage('Dados atualizados com sucesso.');
  };

  // Remove o erro da tela em 3s
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <div className='p-4 flex flex-col  items-center mx-auto w-full md:bg-cLtGray md:w-[90%] md:max-w-5xl md:mt-4 md:rounded-md md:shadow-md'>
      <form
        onSubmit={handleSubmit}
        className='w-full  flex flex-col  items-center  rounded-md p-4'
        // className='form min-h-[900px] justify-start'
      >
        {userImage && (
          <img
            src={userImage}
            alt={userName}
            className='w-32 md:w-60 rounded-full shadow-md'
          />
        )}
        {!userImage && (
          <div className='w-32 h-32 md:w-60 md:h-60 rounded-full shadow-md flex justify-center items-center bg-cLtGray text-cDkGray'>
            <HiUser size={50} />
          </div>
        )}
        <label className='form-label' htmlFor='username'>
          <span className='text-md font-bold text-cBlue '>Nome:</span>
          <input
            className='form-input bg-cLtGray mb-4 md:bg-cWhite'
            name='username'
            type='text'
            value={userName || ''}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete='on'
          />
        </label>
        <label className='form-label' htmlFor='image'>
          <span className='text-md font-bold text-cBlue '>Foto de perfil:</span>
          <input
            className='form-input bg-cLtGray mb-4 md:bg-cWhite'
            name='image'
            type='text'
            value={userImage || ''}
            placeholder='Insira o URL da imagem'
            onChange={(e) => setUserImage(e.target.value)}
            autoComplete='on'
          />
        </label>

        <label className='form-label' htmlFor='email'>
          <span className='text-md font-bold text-cBlue '>E-mail:</span>
          <input
            className='form-input bg-cDkGray text-cWhite mb-4  md:bg-cWhite md:text-cDkGray'
            name='email'
            type='email'
            value={userEmail || ''}
            disabled
          />
        </label>
        <label className='form-label' htmlFor='password'>
          <span className='text-md font-bold text-cBlue '>Alterar senha:</span>
          <input
            className='form-input bg-cLtGray mb-4 md:bg-cWhite'
            name='password'
            type='password'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='on'
          />
        </label>
        <label className='form-label' htmlFor='confirmPassword'>
          <span className='text-md font-bold text-cBlue '>
            Confirmar senha:
          </span>
          <input
            className='form-input bg-cLtGray mb-4 md:bg-cWhite'
            name='confirmPassword'
            type='password'
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='on'
          />
        </label>

        {!response.loading && (
          <input type='submit' value='Atualizar dados' className='btn  mt-8' />
        )}
        {response.loading && (
          <input
            className='form-input bg-cLtGray mb-4 md:bg-cWhite'
            type='submit'
            value='Atualizando'
            disabled
          />
        )}
        {error && <p className='error'>{error}</p>}
        {message && <p className='success'>{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
