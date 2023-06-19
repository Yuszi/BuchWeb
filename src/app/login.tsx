'use client';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import * as yup from 'yup';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // For Validation 
  const [isInvalid, setIsInvalid] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleModalToggle = () => setShowModal(!showModal);

  useEffect(() => {
    deleteCookie('token');
  }, []);

  const handleLogin = () => {
    const loginUrl = 'https://localhost:3000/auth/login';

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
        setShowModal(false);
      })
      .catch((error) => {
        console.log('Login failed:', error);
      }
      );
  };

  const handleLoginPress = (e: any) => {
    if (e.key === 'Enter'){
      handleLogin();
    }
  }

  const handleUsernameBlur = async (event: any) => {
    const schema = yup.string().matches(/^[a-zA-Z0-9]+$/, 'Ungültiger Titel').required('Titel ist erforderlich');
    const { value } = event.target;
  
    try {
      await schema.validate(value);
      // Validation passed
      setUsernameErrorMessage('');
      setIsInvalid(false);
    } catch (error) {
      // Validation failed
      setUsernameErrorMessage('Invalid input');
      setIsInvalid(true);
    }
  };

  const handleLoggingOut = () => {
    setIsLoggedIn(false);
    deleteCookie('token');
  }
  return (
    <>
    {isLoggedIn ? (
      <span onClick={handleLoggingOut}  style={{ cursor: 'pointer' }}><li>Log out</li></span>
    ) : (
      <div>
        <FontAwesomeIcon
          className="modal-toggle"
          icon={faUser}
          onClick={handleModalToggle}
          size="2x"
          style={{ cursor: 'pointer' }}
        />
      </div>
    )}
    {showModal && (
      <div className="modal show" tabIndex={-1} role="dialog" style={{ display: 'block', }}>
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="fa fa-window-close" onClick={handleModalToggle}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='centered-form' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input
                  className="form-control"
                  style={{ margin: '5px 0'}}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyDown={handleLoginPress}
                  onBlur={handleUsernameBlur}
                />
                {usernameErrorMessage && <p style={{ color: 'red' }}>{usernameErrorMessage}</p>}
                <input
                  className="form-control"
                  style={{ margin: '5px 0'}}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleLoginPress}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" type="button" onClick={handleLogin} disabled={isInvalid}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default Login;
