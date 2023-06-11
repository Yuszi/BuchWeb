'use client';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function ListBookWithIsbn() {
  const [titel, SetTitel] = useState('');
  const [preis, SetPreis] = useState('');
  const [homepage, SetHomepage] = useState('');
  const [datum, SetDatum] = useState('');
  const [rabatt, SetRabatt] = useState('');

  const isbn = useParams();

  const getBookWithTitel = () => {
    axios.get(`https://localhost:3002/rest/?isbn=${isbn.id}`).then((res) => {
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
    getBookWithTitel();
  }, [isbn.id]);
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
          <tr >
            <th>ISBN</th>
            <th>Titel</th>
            <th>Preis</th>
            <th>Homepage</th>
            <th>Datum</th>
            <th>Rabatt</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{isbn.id}</td>
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

    </>
  );
}
