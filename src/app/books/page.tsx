'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

interface Book {
  titel: string;
  isbn: string;
  preis: number;
  homepage: string;
  datum: string;
  rabatt: string;
}

export default function ListBookWithTitel() {
  const [dictOfBooks, SetDictOfBooks] = useState<Book[]>([]);

  const isbn = useParams();

  const getBookWithTitel = () => {
    axios.get(`https://localhost:3002/rest/`).then((res) => {
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
      SetDictOfBooks(bookList);
      console.log(bookList);
      console.log(res);
      return res;
    });
  };
  useEffect(() => {
    console.log(isbn.id);
    getBookWithTitel();
  }, []);
  return (
    <>
    <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
        </Head>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Titel</th>
            <th>Preis</th>
            <th>Homepage</th>
            <th>Datum</th>
            <th>Rabatt</th>
          </tr>
        </thead>
        <tbody>
          {dictOfBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td>{book.titel}</td>
              <td>{book.preis}</td>
              <td>
                <a href={book.homepage}>{book.homepage}</a>
              </td>
              <td>{book.datum}</td>
              <td>{book.rabatt}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
