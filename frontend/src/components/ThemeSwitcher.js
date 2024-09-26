import React, { useState } from 'react';
// import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  console.log(darkTheme);
  
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.className = darkTheme ? 'dark-theme' : 'light-theme';
  };

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        {darkTheme ? 'dark-theme' : 'light-theme'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
