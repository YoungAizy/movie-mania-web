import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppTheme from './utils/AppTheme.tsx';
import './App.scss';
import Shows from './Pages/Shows.tsx';
import People from './Pages/People.tsx';
import Favourites from './Pages/Favourites.tsx'
import PersonDetails from './components/PersonDetails.tsx';
//Routes
import PublicRoutes from './routes/PublicRoutes.tsx';
import LandingPage from './routes/LandingPage.tsx'
import RegistrationPage from './routes/Register.tsx'
import Profile from './routes/Profile.tsx';
import Account from './routes/Account.tsx';
import SearchInfo from './routes/SearchInfo.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
//Context
import { AuthContextProvider } from './Context/AuthContext.tsx';
import { AppContextProvider } from './Context/AppContext.tsx';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <ThemeProvider theme={AppTheme}>
            <div className="App">
            <Routes>
                <Route element={<PublicRoutes/>}>
                  <Route path="/" element={<LandingPage/>} />
                  <Route path='/register' element={<RegistrationPage />} />
                </Route>
                <Route path="/home" element={<Shows/>} />
                <Route path="/people" element={<People />} />
                <Route path="/people/:id" element={<PersonDetails />} />
                <Route element={<ProtectedRoutes/> }>
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/settings" element={<Account />} />
                </Route>
                <Route path="/search" element={<SearchInfo/>} />
                <Route path="*" element={<Navigate to='/' /> }/>
            </Routes>
            </div>
          </ThemeProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
