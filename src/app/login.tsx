"use client";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Login() {
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
              />
            </li>
            <li>
              <input
                className="dropdown-item"
                type="password"
                placeholder="Password"
              />
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Login
              </button>
            </li>
          </ul>
        </>
      
    );
  }
  
  