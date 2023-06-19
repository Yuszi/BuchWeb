'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

const SearchBook = () => {
  const router = useRouter();
  const [pathId, SetPathId] = useState('');
  const [path, SetPath] = useState('');
  const [placeholderText, SetPlaceholderText] = useState('');
  const [disableInput, SetDisableInput] = useState(true);
  const [buttonText, setButtonText] = useState('Filter');

  const defaultPlaceholder =
    'Wähle den Filter, um entweder mit ISBN oder Titel zu suchen!';

  useEffect(() => {
    console.log(pathId);
    SetPlaceholderText(defaultPlaceholder);
  }, [pathId]);

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/${path}/${pathId}`);
    }
  };

  const onFilterChange = (
    selectedPath: string,
    selectedPlaceholder: string,
  ) => {
    SetPath(selectedPath);
    SetPlaceholderText(selectedPlaceholder);
    setButtonText(selectedPath ? `Suche nach '${selectedPath}'` : 'Filter');
  };

  return (
    <ThemeProvider>
      <div className={`${styles.form}`}>
        <div className="dropdown">
          <button
            className={`btn btn-secondary dropdown-toggle ${styles.dropdownMenuButton}`}
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {buttonText}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropDownMenuButton">
            <li>
              <a
                className="dropdown-item btn btn-secondary"
                onClick={() => {
                  onFilterChange('titel', 'Gebe den Titel ein');
                  SetDisableInput(false);
                }}
              >
                Titel
              </a>
            </li>
            <li>
              <a
                className="dropdown-item btn btn-secondary"
                onClick={() => {
                  onFilterChange('isbn', 'Gebe die ISBN ein');
                  SetDisableInput(false);
                }}
              >
                ISBN
              </a>
            </li>
            <li>
              <hr className="dropdown-divided"></hr>
            </li>
            <li>
              <a
                className="dropdown-item btn btn-primary"
                onClick={() => {
                  onFilterChange('', defaultPlaceholder);
                  SetDisableInput(true);
                  SetPathId('');
                }}
              >
                Zurücksetzen
              </a>
            </li>
          </ul>
        </div>
        <input
          className={`${styles.input}`}
          type="text"
          placeholder={placeholderText}
          onChange={(e) => SetPathId(e.target.value)}
          onKeyDown={handleKeyPress}
          value={pathId}
          disabled={disableInput}
        />
        <Link href={`/${path}/${pathId}`}>
          <button
            className={`btn btn-secondary ${styles.button}`}
            type="submit"
          >
            Suchen
          </button>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default SearchBook;
