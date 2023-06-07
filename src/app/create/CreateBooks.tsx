"use client";
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../page.module.css';
import axios from 'axios';

export default function CreateLOL() {
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [art, setArt] = useState('');
  const [preis, setPreis] = useState('');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState('');
  const [schlagwörter, setSchlagwörter] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());


  const [token, SetToken] = useState('');

  const handleIsbnChange = (e: any) => {
    setIsbn(e.target.value);
  };

  const handleRatingChange = (e: any) => {
    setRating(parseInt(e.target.value));
  };

  const handleArtChange = (e: any) => {
    setArt(e.target.value);
  };

  const handlePreisChange = (e: any) => {
    setPreis(e.target.value);
  };

  const handleRabattChange = (e: any) => {
    setRabatt(e.target.value);
  };

  const handleLieferbarChange = (e: any) => {
    setLieferbar(e.target.value);
  };

  const handleSchlagwörterChange = (e: any) => {
    setSchlagwörter(e.target.value);
  };

  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date: Date) => {
    setCalendarDate(date);
    formatDate(calendarDate);
  };

  useEffect(() => {
    console.log(isbn);
    console.log(rating);
    console.log(art);
    console.log(parseFloat(preis).toFixed(2));
    console.log(rabatt);
    console.log(lieferbar.toLowerCase());
    console.log(schlagwörter);
    console.log(formatDate(calendarDate));
  });

  const handleSubmit = () => {
    const payload = {
      isbn: isbn,
      rating: rating,
      art: art,
      preis: parseFloat(preis).toFixed(2),
      rabatt: parseFloat(rabatt),
      lieferbar: lieferbar.toLowerCase(),
      datum: formatDate(calendarDate),
      homepage: 'https://post.rest',
      schlagwoerter: schlagwörter.split(',').map((keyword) => keyword.trim()),
      titel: {
        titel: 'Ich liebe die rumänische Bildung',
        untertitel: 'die sind echt gut in SWA',
      },
      abbildungen: [
        {
          beschriftung: 'Abb. 1',
          contentType: 'img/png',
        },
      ],
    };

    console.log(payload);

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

    axios
      .post('https://localhost:3002/rest', payload, config)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

    const handleLogin = () => {
        const loginUrl = 'https://localhost:3002/auth/login';

        const loginData = {
            username: 'admin',
            password: 'p'
        };
    
        axios.post(loginUrl, loginData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(
            e => {
                console.log(e);

                SetToken(e.data.token);
                console.log(token);
                console.log(loginData);
                console.log('WOWWWw WIR SIND DRINNE');
            }
        )
    }
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">ISBN</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="978-0-201-63361-0"
          value={isbn}
          onChange={handleIsbnChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">Rating</label>
        <select
          className="form-control"
          id="exampleFormControlSelect2"
          value={rating}
          onChange={handleRatingChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Art</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          value={art}
          onChange={handleArtChange}
        >
          <option>DRUCKAUSGABE</option>
          <option>KINDLE</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Preis</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="200"
          value={preis}
          onChange={handlePreisChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Rabatt</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="0.33"
          value={rabatt}
          onChange={handleRabattChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Lieferbar</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          value={lieferbar}
          onChange={handleLieferbarChange}
        >
          <option>True</option>
          <option>False</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Schlagwörter</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          value={schlagwörter}
          onChange={handleSchlagwörterChange}
        >
          <option>JAVASCRIPT</option>
          <option>TYPESCRIPT</option>
        </select>
      </div>
      <Calendar
        value={calendarDate.toISOString()}
        onChange={handleDateChange}
        showNeighboringMonth={false}
        locale={'de-DE'}
      />
      <button type="button" className={styles.button} onClick={handleSubmit}>
        Buch anlegen
      </button>

      <div>
        <button type="button" className={styles.button} onClick={handleLogin}>
            Als Admin einloggen
        </button>
      </div>
    </form>
  );
}
