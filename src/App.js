import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import BottomNav from './components/BottomNav'
import Shows from './Pages/Shows';
import People from './Pages/People';
import Favourites from './Pages/Favourites'
import PersonDetails from './components/PersonDetails';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Shows} />
          <Route exact path="/people" component={People} />
          <Route path="/people/:id" component={PersonDetails} />
          <Route path="/favourites" component={Favourites} />
        </Switch>
      <BottomNav/>
      </div>
    </BrowserRouter>
  );
}

export default App;
