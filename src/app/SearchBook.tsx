'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './page.module.css';

export default function SearchBook() {
  const [pathId, SetPathId] = useState('');
  const [path, SetPath] = useState('');
  const [placeholderText, SetPlaceholderText] = useState('');

  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText('Press a Button for search option');
  }, [pathId]);

  return (
    <>
      <input
        type="text"
        placeholder={placeholderText}
        onChange={(e) => SetPathId(e.target.value)}
        value={pathId}
      />
      <Link href={`http://localhost:3000/${path}/${pathId}`}>
        <button type="button" className={styles.button}>
          Suchen
        </button>
      </Link>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            SetPath('titel');
            SetPlaceholderText('Enter Titel');
          }}
        >
          Titel
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            SetPath('isbn');
            SetPlaceholderText('Enter ISBN');
          }}
        >
          ISBN
        </button>
      </div>
    </>
  );
}
