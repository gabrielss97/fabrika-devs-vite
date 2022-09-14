import { RiSunFill, RiMoonFill } from 'react-icons/ri';

function Toggle({ darkMode, setDarkMode }) {
  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className='relative flex justify-between rounded-2xl p-[2px] cursor-pointer gap-1 border-[2px] border-cBlue'
      onClick={handleClick}>
      <RiMoonFill className='w-4 h-4 text-cBlue' />
      <RiSunFill className='w-4 h-4 text-cBlue' />
      <div
        className={`rounded-full absolute bg-cBlue w-4 h-4 ${
          darkMode ? 'right-[2px]' : 'left-[2px]'
        }  `}
      />
    </div>
  );
}

export default Toggle;
