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
      <div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('titel');
              SetPlaceholderText('Enter Titel');
            }}
            >
            Titel
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              SetPath('isbn');
              SetPlaceholderText('Enter ISBN');
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
    </>
  );
}
