'use client';

import axios, { HttpStatusCode } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import InternalErrorPage from '../../../(errorPages)/errorInternal';
import NotFoundPage from '../../../(errorPages)/errorNotFound';

const GetBookByTitel = () => {
  // Hooks for output data
  const [isbn, setIsbn] = useState('?');
  const [preis, setPreis] = useState('?');
  const [homepage, setHomepage] = useState('?');
  const [datum, setDatum] = useState('?');
  const [rabatt, setRabatt] = useState('?');

  const [responseCode, setResponseCode] = useState(HttpStatusCode.Ok);

  const titel = useParams();

  const fetchBookByTitel = (titel: any) => {
    axios
      .get(`https://localhost:3000/rest/?titel=${titel}`)
      .then((res) => {
        // wichtigen Teil des Responses filtern
        const data = res['data']['_embedded']['buecher']['0'];

        setIsbn(data.isbn);
        setPreis(data.preis);
        setHomepage(data.homepage);
        setDatum(data.datum);

        const rabattBerechnung = (data.rabatt * 100).toFixed(1);
        setRabatt(rabattBerechnung + '%');
        console.log(data);
        console.log(data.isbn);

        return data;
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log('Book with a title={} was not found.', titel);
          setResponseCode(HttpStatusCode.NotFound);
        } else {
          console.log('An error occurred.');
          setResponseCode(HttpStatusCode.InternalServerError);
        }
      });
  };

  useEffect(() => {
    console.log(titel.id);
    fetchBookByTitel(titel.id);
  }, [titel.id]);

  switch (responseCode) {
    case HttpStatusCode.NotFound:
      return <NotFoundPage />;
    case HttpStatusCode.Ok:
      return (
        <div>
          <h1>{titel.id}</h1>
          <table>
            <thead>
              <tr className={styles.tr}>
                <th>ISBN</th>
                <th>Preis</th>
                <th>Homepage</th>
                <th>Datum</th>
                <th>Rabatt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{isbn}</td>
                <td>{preis}</td>
                <td>
                  <a href={homepage}>{homepage}</a>
                </td>
                <td>{datum}</td>
                <td>{rabatt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    default:
      return <InternalErrorPage />;
  }
};

export default GetBookByTitel;
