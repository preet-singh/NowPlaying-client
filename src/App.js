//Dependencies
import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import HomePageRoute from './routes/HomePage/HomePageRoute';
import CategoryRoute from './routes/Category/CategoryRoute';
import ThreadRoute from './routes/Thread/ThreadRoute';
import LoginRoute from './routes/Login/LoginRoute';
import RegisterRoute from './routes/Register/RegisterRoute';
import NotFoundRoute from './routes/NotFound/NotFound';

//EJ IS TESTING HERE TO PUSH

//CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageRoute} />
        <Route path="/category/:id" component={CategoryRoute} />
        {/* <Route path="/thread/:id" component={ThreadRoute} /> */}
        <Route path="/:thread/:id" component={ThreadRoute} />
        <Route path="/login" component={LoginRoute} />
        <Route path="/register" component={RegisterRoute} />
        <Route component={NotFoundRoute} />
      </Switch>
    </div>
  );
}

export default App;
