'use client';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  }, []);
  return (
    <>
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
