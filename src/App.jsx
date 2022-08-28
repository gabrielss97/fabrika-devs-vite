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
import Home from './pages/Home/Home';
import Course from './pages/Course/Course';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';

function App() {
  const user = true;
  // const [user, setUser] = useState(undefined);
  // const { auth } = useAuth();

  const admin = true;

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userParams) => {
  //     setUser(userParams);
  //   });
  // }, [auth]);

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }
  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/course' />} />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/course' />}
          />
          <Route
            path='/course'
            element={user ? <Course /> : <Navigate to='/login' />}
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
            element={user && admin ? <Register /> : <Navigate to='/course' />}
          />
          <Route
            path='/panel/video-upload'
            element={user && admin ? <Register /> : <Navigate to='/course' />}
          />
          <Route
            path='/panel/edit-profile'
            element={user && admin ? <Register /> : <Navigate to='/course' />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
