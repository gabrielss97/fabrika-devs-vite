// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useLayoutEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useFetchDocuments } from './hooks/useFetchDocuments';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/Header/Header';

// Pages
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Profile from './pages/Profile/Profile';

import Content from './pages/Content/Content';

import Panel from './pages/Dashboard/Panel/Panel';
import Admins from './pages/Dashboard/Admins/Admins';
import Users from './pages/Dashboard/Users/Users';
import Categories from './pages/Dashboard/Categories/Categories';
import Videos from './pages/Dashboard/Videos/Videos';

function App() {
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(false);
  const { auth } = useAuth();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      setUser(userParams);
    });
  }, [auth]);

  const { documents: users } = useFetchDocuments('users');

  useLayoutEffect(() => {
    if (user && users) {
      const check = users.filter((usr) => usr.id === user.uid);
      if (check[0].admin === true) {
        setAdmin(true);
      }
    }
  }, [user, users]);

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }
  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <Header admin={admin} user={user} />
        <Routes>
          {!user && <Route path='/' element={<Navigate to='/login' />} />}
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate to='/' />}
          />
          {user && !admin && (
            <>
              <Route path='/' element={<Content />} />
              <Route path='/profile' element={<Profile user={user} />} />
            </>
          )}
          {user && admin && (
            <>
              <Route path='/' element={<Panel user={user} />} />
              <Route path='/profile' element={<Profile user={user} />} />
              <Route path='/admins' element={<Admins />} />
              <Route path='/users' element={<Users />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/videos' element={<Videos />} />
            </>
          )}
          <Route path='/*' element={<Navigate to='/404' />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
