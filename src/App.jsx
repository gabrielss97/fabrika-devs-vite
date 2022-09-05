// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useLayoutEffect } from 'react';
import { useAuth } from './hooks/useAuth';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/Header/Header';

// Pages
import Course from './pages/Course/Course';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import VideosPanel from './pages/VideosPanel/VideosPanel';
import UsersPanel from './pages/UsersPanel/UsersPanel';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CategoriesPanel from './pages/CategoriesPanel/CategoriesPanel';
import AdminsPanel from './pages/AdminsPanel/AdminsPanel';
import Register from './pages/Register/Register';
import { useFetchDocuments } from './hooks/useFetchDocuments';

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
          {admin ? (
            <Route
              path='/'
              element={
                user ? <AdminDashboard user={user} /> : <Navigate to='/login' />
              }
            />
          ) : (
            <Route
              path='/'
              element={user ? <Course /> : <Navigate to='/login' />}
            />
          )}
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate to='/' />}
          />
          <Route
            path='/profile'
            element={user ? <Profile user={user} /> : <Navigate to='/login' />}
          />
          <Route
            path='/panel/admins'
            element={user && admin ? <AdminsPanel /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/users'
            element={user && admin ? <UsersPanel /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/videos'
            element={user && admin ? <VideosPanel /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/categories'
            element={user && admin ? <CategoriesPanel /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/profile/'
            element={
              user && admin ? <Profile user={user} /> : <Navigate to='/' />
            }
          />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
