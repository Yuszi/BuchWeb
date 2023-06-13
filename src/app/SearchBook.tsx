'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from 'next-themes';
import { Button } from 'react-bootstrap';

export default function SearchBook() {
  const router = useRouter();
  const [pathId, SetPathId] = useState('');
  const [path, SetPath] = useState('');
  const [placeholderText, SetPlaceholderText] = useState('');
  const [disableInput, SetDisableInput] = useState(true);


  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText(
      'Klicke den Button an, um entweder mit ISBN oder Titel zu suchen!',
    );
  }, [pathId]);

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/${path}/${pathId}`);
    }
  };

  return (
    <ThemeProvider>
      <form>
        <input 
        type="text" 
        placeholder={placeholderText}
        onChange={(e) => SetPathId(e.target.value)}
        onKeyDown={handleKeyPress}
        value={pathId}
        disabled={disableInput} />
       <Link href={`/${path}/${pathId}`}> 
        <button 
        className='btn btn-secondary'
        type="submit"
        >
          Suchen
          </button>
        </Link>
      </form>
    </ ThemeProvider>
  );
}
