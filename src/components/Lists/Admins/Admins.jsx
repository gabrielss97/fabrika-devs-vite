// Icons
import { CgRemove } from 'react-icons/cg';
import { useEffect, useState } from 'react';

// Hooks
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';

const Admins = () => {
  // Fetch de todos os usuários
  const { documents: allUsers, loading } = useFetchDocuments('users');
  const { updateDocument } = useUpdateDocument('users');

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (allUsers) {
      const filter = allUsers.filter((user) => user.admin === true);
      setUsers(filter);
    }
  }, [allUsers]);

  const removeAdmin = (id) => {
    updateDocument(id, { admin: false });
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {message && <p className='error mb-8'>{message}</p>}

      <h1>Administradores</h1>

      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div
            key={user.id}
            className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
            <p className='w-1/2 text-cDkGray'>{user.name}</p>
            <p className='w-1/2 text-cDkGray'>{user.email}</p>
            <div className='flex gap-4 w-1/4 justify-end'>
              {users.length === 1 && (
                <button
                  type='button'
                  className='text-cGray'
                  onClick={() =>
                    setMessage(
                      'Não é possivel remover todos os administradores, por favor adicione mais um para remover este.'
                    )
                  }>
                  <CgRemove />
                </button>
              )}
              {users.length > 1 && (
                <button
                  type='button'
                  className='text-cRed'
                  onClick={() => removeAdmin(user.id)}>
                  <CgRemove />
                </button>
              )}
            </div>
          </div>
        ))}
      {users && users.length === 0 && (
        <p className='w-full  text-center text-lg mt-20'>
          Nenhum administrador cadastrado.
        </p>
      )}
    </div>
  );
};

export default Admins;
