import '../app/global.scss'
import SearchBook from './SearchBook';
import Head from 'next/head';
import Script from 'next/script';
import './page.module.css'; 
import Image from 'next/image'
import profilePic from './hintergrund.png'
import { useEffect } from 'react';


export default function Page(...args: []) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous" />
      <SearchBook />
    </>
  );
}
