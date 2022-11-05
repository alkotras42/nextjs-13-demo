import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className='p-5 bg-blue-500 flex gap-3'>
      <Link className='px-2 py-1 bg-white text-blue-500 rounded-lg' href='/'>
        Home
      </Link>
      <Link className='px-2 py-1 bg-white text-blue-500 rounded-lg' href='/todos'>
        Todos
      </Link>
    </header>
  );
}
