'use client';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function ListBookWithTitel() {
  const [isbn, SetIsbn] = useState('');
  const [preis, SetPreis] = useState('');
  const [homepage, SetHomepage] = useState('');
  const [datum, SetDatum] = useState('');
  const [rabatt, SetRabatt] = useState('');

  const titel = useParams();

  const getBookWithTitel = () => {
    axios.get(`https://localhost:3002/rest/?titel=${titel.id}`).then((res) => {
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
    getBookWithTitel();
  }, [titel.id]);
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
      <h1>{titel.id}</h1>
      <h3>ISBN:{isbn}</h3>
      <h3>Preis:{preis}€</h3>
      <h3>
        Homepage: <Link href={`${homepage}`}> {homepage}</Link>
      </h3>
      <h3>Datum:{datum}</h3>
      <h3>Rabatt:{rabatt}</h3>
    </>
  );
}
