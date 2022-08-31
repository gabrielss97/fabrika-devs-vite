import { useContext, createContext, useState } from 'react';

const HomeVideoContext = createContext();

export function HomeVideoProvider({ children }) {
  const [video, setVideo] = useState({});

  return (
    <HomeVideoContext.Provider value={video}>
      {children}
    </HomeVideoContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(HomeVideoContext);
}
