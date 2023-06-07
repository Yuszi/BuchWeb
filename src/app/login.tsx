"use client";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useState } from 'react';
import { setCookie, hasCookie, deleteCookie, getCookie } from "cookies-next";


export default function Login() {

    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');

    const [token, SetToken] = useState('');

  
    const handleUsernameChange = (e: any) => {
        SetUsername(e.target.value);
    };
    const handlePasswordChange = (e: any) => {
        SetPassword(e.target.value);
    };

    const handleLogin = () => {
        const loginUrl = 'https://localhost:3002/auth/login';
    
        const loginData = {
          username: 'admin',
          password: 'p',
        };
    
        axios
          .post(loginUrl, loginData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .then((e) => {
            console.log(e);
    
            SetToken(e.data.token);
              
            setCookie("token", token);
            console.log('cookie done');
            console.log(getCookie("token"));
            console.log(token);
            console.log(loginData);
            console.log('WOWWWw WIR SIND DRINNE');
          });
      };
    
    return (
        <>
          <FontAwesomeIcon
            className="dropdown-toggle"
            icon={faUser}
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <input
                className="dropdown-item"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </li>
            <li>
              <input
                className="dropdown-item"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </li>
            <li>
              <button className="dropdown-item" type="button" onClick={handleLogin}>
                Login
              </button>
            </li>
          </ul>
        </>
      
    );
}

  
  