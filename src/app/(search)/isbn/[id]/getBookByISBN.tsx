'use client';

import axios from 'axios';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const GetBookByISBN = () => {
  const [titel, setTitel] = useState('');
  const [preis, setPreis] = useState('');
  const [homepage, setHomepage] = useState('');
  const [datum, setDatum] = useState('');
  const [rabatt, setRabatt] = useState('');

  const isbn = useParams();

  const getBookWithIsbn = (isbn: any) => {
    axios.get(`https://localhost:3000/rest/?isbn=${isbn}`).then((res) => {
      // wichtigen Teil des Responses filtern
      const data = res['data']['_embedded']['buecher']['0'];

      setTitel(data.titel.titel);
      setPreis(data.preis);
      setHomepage(data.homepage);
      setDatum(data.datum);

      const rabattBerechnung = (data.rabatt * 100).toFixed(1);
      setRabatt(rabattBerechnung + '%');
      console.log(data);
      console.log(data.isbn);

      return data;
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log('Book with an ISBN={} was not found.', isbn);
        
      } else {
        // Handle other errors
        console.log('An error occurred.');
      }
    });;
  };

  useEffect(() => {
    console.log(isbn.id);
    getBookWithIsbn(isbn.id);
  }, [isbn.id]);

  return (
    <div>
        <h1>{isbn.id}</h1>
        <table>
            <thead>
            <tr className={styles.tr}>
                <th>Titel</th>
                <th>Preis</th>
                <th>Homepage</th>
                <th>Datum</th>
                <th>Rabatt</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{titel}</td>
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
}

export default GetBookByISBN;
