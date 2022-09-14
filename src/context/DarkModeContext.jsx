import { useContext, createContext, useReducer } from 'react';

const DarkModeContext = createContext();

const initialState = { darkMode: true };

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

export function DarkModeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DarkModeContext.Provider value={{ state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
