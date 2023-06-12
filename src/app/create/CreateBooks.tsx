'use client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export default function CreateBook() {
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [art, setArt] = useState('DRUCKAUSGABE');
  const [preis, setPreis] = useState('0');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState('true');
  const [schlagwörter, setSchlagwörter] = useState('JAVASCRIPT');
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [titel, setTitel] = useState('');
  const [untertitel, setUntertitel] = useState('');

  const [token, SetToken] = useState('');

  useEffect(() => {
    SetToken(String(getCookie('token')));
    console.log(token);
  }, [token]);

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
  const handleTitelChange = (e: any) => {
    setTitel(e.target.value);
  };
  const handleUntertitelChange = (e: any) => {
    setUntertitel(e.target.value);
  };

  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date: any) => {
    setCalendarDate(new Date(date));
    formatDate(calendarDate);
  };

  const handleSubmit = () => {
    const payload = {
      isbn: isbn,
      rating: rating,
      art: art,
      preis: Number(parseFloat(preis).toFixed(2)),
      rabatt: parseFloat(rabatt),
      lieferbar: Boolean(lieferbar.toLowerCase()),
      datum: formatDate(calendarDate),
      homepage: 'https://post.rest',
      schlagwoerter: schlagwörter.split(',').map((keyword) => keyword.trim()),
      titel: {
        titel: titel,
        untertitel: untertitel,
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
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('https://localhost:3000/rest', payload, config);

    axios
      .post('https://localhost:3000/rest', payload, config)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        confirm(`Succesfully added ${titel}`);
      })
      .catch((error) => {
        // Handle the error

        switch (error.response?.status) {
          case 400:
            alert('Keine richtige ISBN angegeben');
            break;
          case 403:
            alert('Du bist wohl kein Admin');
            break;
          case undefined:
            alert('Backend Server ist nicht gestartet!');
            break;
          default:
            alert(error.message);
            break;
        }
/* Replace switch if it shows anomalous behavior, else remove this comment

        if (error == 'AxiosError: Request failed with status code 403') {
          alert('Du bist wohl kein Admin');
        } else if (error == 'AxiosError: Request failed with status code 400') {
          alert('Keine richtige ISBN angegeben');
        } else if (error == 'AxiosError: Network Error') {
          alert('Backend Server ist nicht gestartet!');
        } else {
          alert(error);
        }
*/
      });
  };

  return (
    <form>
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
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
        </select>
      </div>
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
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
      <div className="form-group form-group-wide">
        <label htmlFor="exampleFormControlInput1">Titel</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Titel"
          value={titel}
          onChange={handleTitelChange}
        />
      </div>
      <div className="form-group form-group-wide">
        <label htmlFor="exampleFormControlInput1">Untertitel</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Untertitel"
          value={untertitel}
          onChange={handleUntertitelChange}
        />
      </div>
      <Calendar
        value={calendarDate.toISOString()}
        onChange={handleDateChange}
        showNeighboringMonth={false}
        locale={'de-DE'}
      />
      <button
        type="button"
        className="btn btn-secondary btn-lg btn-block"
        onClick={handleSubmit}
      >
        Buch anlegen
      </button>
    </form>
  );
}
