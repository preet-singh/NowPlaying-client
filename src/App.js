//Dependencies
import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import HomePage from './routes/HomePage/HomePage';
import Category from './routes/Category/Category';
import Thread from './routes/Thread/Thread';
import Login from './routes/Login/Login';
import NotFound from './routes/NotFound/NotFound';

//CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/category/:id" component={Category} />
        <Route path="/thread/:id" component={Thread} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
