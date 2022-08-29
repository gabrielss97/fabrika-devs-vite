import { useState, useEffect } from 'react';

// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from 'firebase/auth';

// Context
import { AuthProvider } from './context/AuthContext';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import Header from './components/Header/Header';

// Pages
import Course from './pages/Course/Course';
import Login from './pages/Login/Login';
import Users from './components/AddUserForm/AddUserForm';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import Videos from './pages/Videos/Videos';

function App() {
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(true);
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
        <Header admin={admin} />
        <Routes>
          <Route
            path='/'
            element={user ? <Course /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/profile'
            element={user ? <Profile /> : <Navigate to='/login' />}
          />
          <Route
            path='/profile/edit'
            element={user ? <EditProfile /> : <Navigate to='/login' />}
          />
          <Route
            path='/panel/users'
            element={user && admin ? <Users /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/videos'
            element={user && admin ? <Videos /> : <Navigate to='/' />}
          />
          <Route
            path='/panel/profile'
            element={user && admin ? <Profile /> : <Navigate to='/' />}
          />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
