import { Routes, Route } from 'react-router-dom';


import LanguageToggle from './components/LanguageToggle.jsx';
import Navbar from './components/Navbar.jsx';
import DataFormForFindingProvider from './components/DataFormForFindingProvider.jsx';
import { useState } from 'react';
import Themetoggle from './components/Themetoggle.jsx';
import LoginPage from './components/LoginPage.jsx';


function App() {
  const [page, setPage] = useState('home'); // 'home' | 'login'

  return (
    <>
      <div className="flex justify-end items-center gap-2 pt-4 pr-4">
        <LanguageToggle />
        <Themetoggle/>
      </div>

      <Navbar onSignIn={() => setPage('login')} />

      <Routes>
        <Route path="/" element={<DataFormForFindingProvider />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;