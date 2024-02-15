import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Shows from './Pages/Shows.tsx';
import People from './Pages/People.tsx';
import Favourites from './Pages/Favourites.tsx'
import PersonDetails from './components/PersonDetails.tsx';
//Routes
import WelcomePage from './routes/WelcomePage.tsx';
import RegistrationPage from './routes/Register.tsx'
import Profile from './routes/Profile.tsx';
import Account from './routes/Account.tsx'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/home" element={<Shows/>} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<PersonDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Account />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
