'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import InternalErrorPage from '../(errorPages)/errorInternal';
import { Button } from 'react-bootstrap';

interface Book {
  titel: string;
  isbn: string;
  preis: number;
  homepage: string;
  datum: string;
  rabatt: string;
}

const GetAllBooks = () => {
  const [dictOfBooks, setDictOfBooks] = useState<Book[]>([]);
  const [isInternalError, setIsInternalError] = useState(false);

  const isbn = useParams();

  useEffect(() => {
    console.log(isbn.id);
    axios
      .get(`https://localhost:3000/rest/`)
      .then((res) => {
        // wichtigen Teil des Responses filtern
        const bookList = res['data']['_embedded']['buecher'].map(
          (bookData: any) => {
            const book = {
              titel: bookData.titel.titel,
              isbn: bookData.isbn,
              preis: bookData.preis,
              homepage: bookData.homepage,
              datum: bookData.datum,
              rabatt: (bookData.rabatt * 100).toFixed(1),
            };
            return book;
          },
        );
        setDictOfBooks(bookList);
        console.log(bookList);
        console.log(res);
        return res;
      })
      .catch(() => {
        setIsInternalError(true);
      });
  }, [isbn.id]);

  if (isInternalError) {
    return <InternalErrorPage />;
  } else {
    return (
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>ISBN</th>
            <th>Titel</th>
            <th>Preis</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {dictOfBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td>{book.titel}</td>
              <td>{book.preis}</td>
              <td>{book.datum}</td>
              <a href={`http://localhost:3002/titel/${book.titel}`}>
                <Button>Details</Button>
              </a>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default GetAllBooks;
