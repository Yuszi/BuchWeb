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
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1"></label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={placeholderText}
          onChange={(e) => SetPathId(e.target.value)}
          onKeyPress={handleKeyPress}
          value={pathId}
          style={{ width: '300%' }}
          disabled={disableInput}
        />
      </div>
      <div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('titel');
              SetPlaceholderText('Gebe den Titel ein');
              SetDisableInput(false);
            }}
          >
            Titel
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('isbn');
              SetPlaceholderText('Gebe die ISBN ein');
              SetDisableInput(false);
            }}
          >
            ISBN
          </button>
        </div>
      </div>
      <div>
        <br />
        <Link href={`/${path}/${pathId}`}>
          <button type="button" className="btn btn-secondary btn-lg btn-block">
            Suchen
          </button>
        </Link>
      </div>
      <div>

    </div>
    </ ThemeProvider>
  );
}
