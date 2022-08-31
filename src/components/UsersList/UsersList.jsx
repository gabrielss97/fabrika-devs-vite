// Icons
import { CgRemove, CgEye } from 'react-icons/cg';

// Hooks
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useAuth } from '../../hooks/useAuth';

const UsersList = () => {
  // Fetch de todos os usuários
  const { documents: users, loading } = useFetchDocuments('users');

  // Função de deletar documentos
  const { deleteDocument } = useDeleteDocument('users');
  const { removeUser } = useAuth();

  const handleDelete = (id) => {
    removeUser(id);
    deleteDocument(id);
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8g'>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div
            key={user.id}
            className='flex justify-between items-center p-4 bg-cLtGray mb-2 rounded-md'>
            <p className='w-1/2 text-cDkGray'>{user.name}</p>
            <div className='flex gap-4 w-1/4 justify-end'>
              <button type='button' className=' text-cGreen text-lg'>
                <CgEye />
              </button>
              <button
                type='button'
                className='text-cRed'
                onClick={() => handleDelete(user.id)}>
                <CgRemove />
              </button>
            </div>
          </div>
        ))}
      {users && users.length === 0 && (
        <p className='w-full  text-center text-lg mt-20'>
          Nenhum usuário cadastrado.
        </p>
      )}
    </div>
  );
};

export default UsersList;
