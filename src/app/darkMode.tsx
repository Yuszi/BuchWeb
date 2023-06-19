'use client';
import { useEffect, useState } from 'react';

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the current theme preference from local storage, if available
    const storedTheme = localStorage.getItem('darkMode');
    setIsDarkMode(storedTheme === 'true');
  }, []);

  useEffect(() => {
    // Update the theme preference in local storage and apply the class to the body
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="toggleSwitch"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="toggleSwitch">
        Dark Mode
      </label>
    </div>
  );
};

export default ToggleSwitch;
