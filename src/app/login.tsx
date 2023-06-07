'use client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    deleteCookie('token');
  }, []);

  const handleLogin = () => {
    const loginUrl = 'https://localhost:3002/auth/login';

    const loginData = {
      username: username,
      password: password,
    };

    axios
      .post(loginUrl, loginData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        console.log(response);

        const { token, username } = response.data;

        setCookie('token', token);

        console.log('Cookie set:', getCookie('token'));
        console.log('Logged in as:', username);
        console.log('Login successful');

        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log('Login failed:', error);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <div>Logged in as {username}</div>
      ) : (
        <>
          <FontAwesomeIcon
            className="dropdown-toggle"
            icon={faUser}
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            size="2x"
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
              <button
                className="dropdown-item"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
