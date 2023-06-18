'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const GetBookByISBN = () => {
    const [titel, SetTitel] = useState('');
  const [preis, SetPreis] = useState('');
  const [homepage, SetHomepage] = useState('');
  const [datum, SetDatum] = useState('');
  const [rabatt, SetRabatt] = useState('');

  const isbn = useParams();

  const getBookWithIsbn = (isbn: any) => {
    axios.get(`https://localhost:3000/rest/?isbn=${isbn}`).then((res) => {
      // wichtigen Teil des Responses filtern
      const data = res['data']['_embedded']['buecher']['0'];

      SetTitel(data.titel.titel);
      SetPreis(data.preis);
      SetHomepage(data.homepage);
      SetDatum(data.datum);

      const rabattBerechnung = (data.rabatt * 100).toFixed(1);
      SetRabatt(rabattBerechnung + '%');
      console.log(data);
      console.log(data.isbn);

      return data;
    });
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
