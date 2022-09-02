// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react';
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

function App() {
  const [user, setUser] = useState(undefined);
  const [admin] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      // if (userParams) {
      // console.log(userParams);
      // await user.getIdTokenResult().then((idTokenResult) => {
      //   setAdmin(idTokenResult.claims.admin);
      // se for true  -> setAdmin(true)
      //
      // });
      // }

      setUser(userParams);
    });
  }, [auth]);

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
