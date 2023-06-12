'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './page.module.css';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function SearchBook() {
  const [pathId, SetPathId] = useState('');
  const [path, SetPath] = useState('');
  const [placeholderText, SetPlaceholderText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const defaultSearchBarPlaceholderText = 'Press a Button for search option';
  const defaultSearchButtonText = 'Filter';

  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText(defaultSearchBarPlaceholderText);
  }, [pathId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onFilterChange = (selectedPath: string, selectedPlaceholder: string) => {
    SetPath(selectedPath);
    SetPlaceholderText(selectedPlaceholder);
    setDropdownOpen(false);
  }

  const resetFilter = () => {
    SetPath('');
    SetPathId('');
    SetPlaceholderText(defaultSearchBarPlaceholderText)
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1"></label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={placeholderText}
          onChange={(e) => SetPathId(e.target.value)}
          value={pathId}
          style={{ width: '250%' }}
        />
      </div>
      <div className='d-flex'>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            {defaultSearchButtonText}: {path}
          </button>
          <div
            className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
            aria-labelledby="dropdownMenuButton">
            <button
              className="dropdown-item"
              onClick={() => onFilterChange('titel', 'Enter Titel')}
              >
              Titel
            </button>
            <button
              className="dropdown-item"
              onClick={() => onFilterChange('isbn', 'Enter ISBN')}
            >
              ISBN
            </button>
          </div>
        </div>
        <button 
        type='button' 
        className='btn btn-secondary m-lg-2'
        onClick={resetFilter}
        >
          Reset filter
        </button>
      </div>
      <div>
        <br />
        <Link href={`/${path}/${pathId}`}>
          <button type="button" className="btn btn-secondary btn-lg btn-block">
            Suchen
          </button>
        </Link>
      </div>
    </>
  );
}
