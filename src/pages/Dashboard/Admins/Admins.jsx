// Components
import AdminsList from '../../../components/Lists/Admins/Admins';

// Context
import { useDarkMode } from '../../../context/DarkModeContext';

const Admins = () => {
  const { state } = useDarkMode();

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        state.darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <AdminsList />
    </div>
  );
};

export default Admins;
