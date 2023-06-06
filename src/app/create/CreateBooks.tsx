"use client";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../page.module.css';
import { CDBRating, CDBContainer } from 'cdbreact';

export default function CreateLOL() {
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [art, setArt] = useState('');
  const [preis, setPreis] = useState('');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState('');
  const [schlagwörter, setSchlagwörter] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());

  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleArtChange = (e) => {
    setArt(e.target.value);
  };

  const handlePreisChange = (e) => {
    setPreis(e.target.value);
  };

  const handleRabattChange = (e) => {
    setRabatt(e.target.value);
  };

  const handleLieferbarChange = (e) => {
    setLieferbar(e.target.value);
  };

  const handleSchlagwörterChange = (e) => {
    setSchlagwörter(e.target.value);
  };

  const handleDateChange = (date) => {
    setCalendarDate(date);
  };

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
        value={calendarDate}
        onChange={handleDateChange}
        showNeighboringMonth={false}
        locale={'de-DE'}
      />
      <button type="button" className={styles.button}>
        Buch anlegen
      </button>
    </form>
  );
}
