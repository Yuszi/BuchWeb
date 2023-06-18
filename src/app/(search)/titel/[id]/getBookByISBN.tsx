'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const GetBookByTitel = () => {
    const [isbn, SetIsbn] = useState('?');
  const [preis, SetPreis] = useState('?');
  const [homepage, SetHomepage] = useState('?');
  const [datum, SetDatum] = useState('?');
  const [rabatt, SetRabatt] = useState('?');

  const titel = useParams();

  const getBookWithTitel = (titel: any) => {
    axios.get(`https://localhost:3000/rest/?titel=${titel}`).then((res) => {
      // wichtigen Teil des Responses filtern
      const data = res['data']['_embedded']['buecher']['0'];

      SetIsbn(data.isbn);
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
    console.log(titel.id);
    getBookWithTitel(titel.id);
  }, [titel.id]);

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
  )
}

export default GetBookByTitel;
