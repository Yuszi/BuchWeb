import React from 'react';
import Head from 'next/head';

const MyHeader = () => {
  return (
    <Head>
      <title>Buch</title>
      <meta name="description" content="Beschreibung meiner App" />
      <link rel="icon" href="/favicon.ico" />
      {/* Weitere Metadaten, CSS- und JavaScript-Dateien hier hinzufügen */}
    </Head>
  );
};

export default MyHeader;