/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'react-bootstrap';
import styles from './page.module.css';

const HomepageCarousel = () => {
  return (
    <Carousel className={`${styles.carousel}`}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxWidth: '40%', maxHeight: '40%' }}
          src="buch.jpg"
          alt="Wild Landscape"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxWidth: '40%', maxHeight: '40%' }}
          src="buch1.jpg"
          alt="Camera"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxWidth: '40%', maxHeight: '40%' }}
          src="buch2.jpg"
          alt="Camera"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomepageCarousel;
