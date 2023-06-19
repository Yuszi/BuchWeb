import Head from 'next/head';
import styles from './page.module.css';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';

const Notes = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/ErsteSeiteRM.png"
              alt="First slide"
              width={1000}
              height={400}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/ZweiteSeiteRM.png"
              alt="Second slide"
              width={1000}
              height={500}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/DritteSeiteRM.png"
              alt="Third slide"
              width={1000}
              height={500}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/VierteSeiteRM.png"
              alt="Fourth slide"
              width={750}
              height={1000}
            />
          </div>
          <div className="carousel-item">
            <Image
              src="/FuenfteSeiteRM.png"
              alt="Fifth slide"
              width={750}
              height={250}
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default Notes;
