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
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const defaultPlaceholder = 'Klicke den Button an, um entweder mit ISBN oder Titel zu suchen!';


  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText(
      defaultPlaceholder,
      );
  }, [pathId]);

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/${path}/${pathId}`);
    }
  };

  const onFilterChange = (selectedPath: string, selectedPlaceholder: string) => {
    SetPath(selectedPath);
    SetPlaceholderText(selectedPlaceholder);
    setDropdownOpen(false);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  };

  return (
    <ThemeProvider>
      <form>
      {path ? (
        <div>
          Suche nach: {path}
          <button onClick={() => { 
            onFilterChange('', defaultPlaceholder);
            SetDisableInput(true);
          }}>
            Filter zurücksetzen
          </button>
        </div>
      ) : (
      <div className="dropdown">
        <button
          className={`btn btn-secondary dropdown-toggle ${styles.dropdown}`}
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={toggleDropdown}
        >
          Filter
        </button>
        <div 
        className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton">
          <button 
          className="btn btn-secondary dropdown-item" type="button"
          onClick={() => { 
            onFilterChange('titel', 'Gebe den Titel ein');
            SetDisableInput(false);
          }}>
            Titel
          </button>
          <button className="btn btn-secondary dropdown-item" type="button"
          onClick={() => { 
            onFilterChange('isbn', 'Gebe die ISBN ein');
            SetDisableInput(false);
          }}>
            ISBN
          </button>
        </div>
    </div>)}
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
