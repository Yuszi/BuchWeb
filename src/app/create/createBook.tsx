'use client';
import styles from './page.module.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import * as yup from 'yup';
import { HttpStatusCode } from 'axios';
import InternalErrorPage from '../(search)/errorInternal';
import ForbiddenPage from '../(search)/errorForbidden';
import BadRequestPage from '../(search)/errorBadRequest';

export default function CreateBook() {
  // Hooks for input data
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(1);
  const [art, setArt] = useState('DRUCKAUSGABE');
  const [preis, setPreis] = useState('');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState('true');
  const [schlagwörter, setSchlagwörter] = useState<string[]>([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [titel, setTitel] = useState('');
  const [untertitel, setUntertitel] = useState('');

  // Hooks for validation
  const [isbnErrorMessage, setIsbnErrorMessage] = useState('');
  const [preisErrorMessage, setPreisErrorMessage] = useState('');
  const [rabattErrorMessage, setRabattErrorMessage] = useState('');
  const [titelErrorMessage, setTitelErrorMessage] = useState('');
  const [untertitelErrorMessage, setUntertitelErrorMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(true);

  // Hook for responses
  const [responseCode, setResponseCode] = useState(HttpStatusCode.Ok);

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
    const { value, checked } = e.target;

    if (checked) {
      setSchlagwörter((prev) => [...prev, value]);
    } else {
      setSchlagwörter((prev) => prev.filter((v) => v !== value));
    }
    //setSchlagwörter(e.target.value);
  };
  const handleTitelChange = (e: any) => {
    setTitel(e.target.value);
  };
  const handleUntertitelChange = (e: any) => {
    setUntertitel(e.target.value);
  };

  // Validation of the input fields
  const handleIsbnBlur = async (event: any) => {
    const schema = yup
      .string()
      .required('ISBN-13 ist erforderlich')
      .matches(/^[0-9]{3}-[0-9]{10}$/, 'Ungültige ISBN-13');
    const { value } = event.target;

    try {
      await schema.validate(value);
      // Validation passed
      setIsbnErrorMessage('');
      setIsInvalid(false);
    } catch (error: any) {
      // Validation failed
      setIsbnErrorMessage(error.message);
      setIsInvalid(true);
    }
  };
  const handlePreisBlur = async (event: any) => {
    const schema = yup
      .string()
      .required('Preis ist erforderlich')
      .matches(/^\s*?\d+([.,]\d{1,2})?\s*$/, 'Ungültiger Preis');
    const { value } = event.target;

    try {
      await schema.validate(value);
      // Validation passed
      setPreisErrorMessage('');
      setIsInvalid(false);
    } catch (error: any) {
      // Validation failed
      setPreisErrorMessage(error.message);
      setIsInvalid(true);
    }
  };
  const handleRabattBlur = async (event: any) => {
    const schema = yup
      .string()
      .required('Rabatt ist erforderlich')
      .matches(/^(0(?:\.\d+)?|1(?:\.0)?)$/, 'Ungültiger Rabatt');
    const { value } = event.target;

    try {
      await schema.validate(value);
      // Validation passed
      setRabattErrorMessage('');
      setIsInvalid(false);
    } catch (error: any) {
      // Validation failed
      setRabattErrorMessage(error.message);
      setIsInvalid(true);
    }
  };
  const handleTitelBlur = async (event: any) => {
    const schema = yup
      .string()
      .required('Titel ist erforderlich')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Ungültiger Titel');
    const { value } = event.target;

    try {
      await schema.validate(value);
      // Validation passed
      setTitelErrorMessage('');
      setIsInvalid(false);
    } catch (error: any) {
      // Validation failed
      setTitelErrorMessage(error.message);
      setIsInvalid(true);
    }
  };
  const handleUntertitelBlur = async (event: any) => {
    const schema = yup
      .string()
      .required('Untertitel ist erforderlich')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Ungültiger Untertitel');
    const { value } = event.target;

    try {
      await schema.validate(value);
      // Validation passed
      setUntertitelErrorMessage('');
      setIsInvalid(false);
    } catch (error: any) {
      // Validation failed
      setUntertitelErrorMessage(error.message);
      setIsInvalid(true);
    }
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
      preis: Number(parseFloat(preis.replace(',', '.')).toFixed(2)),
      rabatt: parseFloat(rabatt),
      lieferbar: Boolean(lieferbar.toLowerCase()),
      datum: formatDate(calendarDate),
      homepage: 'https://post.rest',
      schlagwoerter: schlagwörter,
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
        Authorization: `Bearer ${String(getCookie('token'))}`,
      },
    };

    console.log(config);
    console.log('https://localhost:3000/rest', payload, config);

    axios
      .post('https://localhost:3000/rest', payload, config)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        confirm(`Succesfully added ${titel}`);
      })
      .catch((error) => {
        switch (error.response?.status) {
          case HttpStatusCode.BadRequest:
            setResponseCode(HttpStatusCode.BadRequest);
            break;
          case HttpStatusCode.Forbidden:
            setResponseCode(HttpStatusCode.Forbidden);
            break;
          default:
            setResponseCode(HttpStatusCode.InternalServerError);
            break;
        }
      });
  };

  switch (responseCode) {
    case HttpStatusCode.BadRequest:
      return <BadRequestPage />;
    case HttpStatusCode.Forbidden:
      return <ForbiddenPage />;
    case HttpStatusCode.InternalServerError:
      return <InternalErrorPage />;
    default:
      return (
        <form style={{ marginTop: '20px' }}>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="titelAddon"
            >
              Titel
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Titel"
              value={titel}
              onChange={handleTitelChange}
              onBlur={handleTitelBlur}
              aria-describedby="titelAddon"
            />
            <div className={`input-group ${styles.errorMessage}`}>
              {titelErrorMessage && (
                <p style={{ color: 'red' }}>{titelErrorMessage}</p>
              )}
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="untertitelAddon"
            >
              Untertitel
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Untertitel"
              value={untertitel}
              onChange={handleUntertitelChange}
              onBlur={handleUntertitelBlur}
              aria-describedby="untertitelAddon"
            />
            <div className={`input-group ${styles.errorMessage}`}>
              {untertitelErrorMessage && (
                <p style={{ color: 'red' }}>{untertitelErrorMessage}</p>
              )}
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="isbnAddon"
            >
              ISBN
            </span>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="978-3442151479"
              value={isbn}
              onChange={handleIsbnChange}
              onBlur={handleIsbnBlur}
              style={{ width: '150px' }}
              aria-describedby="isbnAddon"
            />
            <div className={`input-group ${styles.errorMessage}`}>
              {isbnErrorMessage && (
                <p style={{ color: 'red' }}>{isbnErrorMessage}</p>
              )}
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="artAddon"
            >
              Art
            </span>
            <select
              className="form-control"
              value={art}
              onChange={handleArtChange}
              aria-describedby="artAddon"
            >
              <option>DRUCKAUSGABE</option>
              <option>KINDLE</option>
            </select>
          </div>
          <div className="input-group mb-3" style={{ marginLeft: '60px' }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="tsBox"
                value="TYPESCRIPT"
                onChange={handleSchlagwörterChange}
              />
              <label className="form-check-label" htmlFor="tsBox">
                TYPESCRIPT
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="jsBox"
                value="JAVASCRIPT"
                onChange={handleSchlagwörterChange}
              />
              <label className="form-check-label" htmlFor="jsBox">
                JAVASCRIPT
              </label>
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="ratingAddon"
            >
              Rating
            </span>
            <select
              className="form-control"
              value={rating}
              onChange={handleRatingChange}
              aria-describedby="ratingAddon"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="preisAddon"
            >
              Preis
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="200"
              value={preis}
              onChange={handlePreisChange}
              onBlur={handlePreisBlur}
              aria-describedby="preisAddon"
            />
            <div className={`input-group ${styles.errorMessage}`}>
              {preisErrorMessage && (
                <p style={{ color: 'red' }}>{preisErrorMessage}</p>
              )}
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="rabattAddon"
            >
              Rabatt
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="0.33"
              value={rabatt}
              onChange={handleRabattChange}
              onBlur={handleRabattBlur}
              aria-describedby="rabattAddon"
            />
            <div className={`input-group ${styles.errorMessage}`}>
              {rabattErrorMessage && (
                <p style={{ color: 'red' }}>{rabattErrorMessage}</p>
              )}
            </div>
          </div>
          <div className={`input-group mb-3 ${styles.inputForm}`}>
            <span
              className={`input-group-text ${styles.groupText}`}
              id="lieferbarAddon"
            >
              Lieferbar
            </span>
            <select
              className="form-control"
              value={lieferbar}
              onChange={handleLieferbarChange}
              aria-describedby="lieferbarAddon"
            >
              <option>True</option>
              <option>False</option>
            </select>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Calendar
              value={calendarDate.toISOString()}
              onChange={handleDateChange}
              showNeighboringMonth={false}
              locale={'de-DE'}
            />
          </div>
          <button
            type="button"
            className={`btn btn-secondary btn-lg btn-block ${styles.submit}`}
            onClick={handleSubmit}
            disabled={isInvalid}
          >
            Anlegen
          </button>
        </form>
      );
  }
}
