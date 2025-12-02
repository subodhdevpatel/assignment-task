import React, { useEffect, useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import SeatingMap from './components/SeatingMap/SeatingMap';
import Summary from './components/Summary/Summary';
import './App.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BookingProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Metropolis Arena Seating</h1>
          <button
            onClick={toggleTheme}
            style={{ color: 'white', padding: '5px 10px', cursor: 'pointer' }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>
        <main className="app-main">
          <div className="map-section">
            <SeatingMap />
          </div>
          <div className="summary-section">
            <Summary />
          </div>
        </main>
      </div>
    </BookingProvider>
  );
};

export default App;
