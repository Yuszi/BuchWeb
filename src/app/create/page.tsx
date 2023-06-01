"use client";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../page.module.css';
import { CDBRating, CDBContainer } from 'cdbreact';

export default function Create(){

  const [calendarDate, SetCalendarDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    SetCalendarDate(date);
    console.log(calendarDate);
  };

    return(
        <form>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">ISBN</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="978-0-201-63361-0" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect2">Rating</label>
    <select multiple className="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Art</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>DRUCKAUSGABE</option>
      <option>KINDLE</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Preis</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="200" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Rabatt</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="0.33" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Lieferbar</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>True</option>
      <option>False</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Art</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>DRUCKAUSGABE</option>
      <option>KINDLE</option>
    </select>
  </div>
  <Calendar value={calendarDate} 
            onChange={handleDateChange} 
            showNeighboringMonth={false}
            locale={'de-DE'}
  ></Calendar>
  <p>{calendarDate.toString()}</p>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Schlagwörter</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>JAVASCRIPT</option>
      <option>TYPESCRIPT</option>
    </select>
  </div>
  <div>
    <button type="button" className={styles.button}>Buch anlegen</button>
  </div>
</form>
    )
}