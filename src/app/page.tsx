import SearchBook from './searchBook';
import Head from 'next/head';
import Script from 'next/script';
import './page.module.css';

const Page = (...args: []) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"/>

      <SearchBook />
    </>
  );
};

export default Page;
