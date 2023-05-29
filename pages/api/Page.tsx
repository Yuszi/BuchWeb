import React, { useState, ChangeEvent } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Hier kannst du deine eigene Logik für die Überprüfung von Benutzername und Passwort einfügen
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Falscher Benutzername oder Passwort');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
      <h1>Meine Webseite</h1>

      {!loggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button onClick={handleLogin}>Einloggen</button>
        </div>
      ) : (
        <div>
          <p>Eingeloggt als {username}</p>
          <button onClick={handleLogout}>Ausloggen</button>
        </div>
      )}

      <br />
      <input type="text" placeholder="Suche" />
      <button>Suchen</button>
    </div>
  );
};

export default Page;
