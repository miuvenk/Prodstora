import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useNavigate } from '@remix-run/react';

const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
          setDarkMode(savedDarkMode === 'true');
        }
      }
    }, []);
  
    const toggleDarkMode = () => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    };
  
    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [darkMode]);
  

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4">

      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white cursor-pointer"
        onClick={() => navigate('/products')}>
            Prodstora
        </h1>
        <button
          onClick={toggleDarkMode}
          className="text-gray-900 dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>

      </div>
    </header>
  );
};

export default Header;
