import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col gap-10 items-center justify-center heightCalc min-w-full'>
      <h1 className='font-bold text-8xl text-cBlue'>404</h1>
      <p>
        Página não encontrada, volte para o{' '}
        <Link to='/' className=' font-bold text-cBlue'>
          início
        </Link>
      </p>
    </div>
  );
};

export default NotFound;