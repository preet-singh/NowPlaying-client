//Dependencies
import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import HomePageRoute from './routes/HomePage/HomePageRoute';
import CategoryRoute from './routes/Category/CategoryRoute';
import ThreadRoute from './routes/Thread/ThreadRoute';
import LoginRoute from './routes/LoginRoute/LoginRoute';
import RegisterRoute from './routes/Register/RegisterRoute';
import NotFoundRoute from './routes/NotFound/NotFound';
import UserContext from './utils/context';
import AuthService from './utils/auth-service';
import PublicOnlyRoute from './routes/PublicOnlyRoute/PublicOnlyRoute';
import PrivateOnlyRoute from './routes/PrivateOnlyRoute/PrivateOnlyRoute';
import NewThread from './routes/NewThread/NewThread';

//EJ IS TESTING HERE TO PUSH

//CSS
import './App.css';

class App extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    let categories = await AuthService.getMain().then(response => response);
    await this.context.setCategoryList(categories);
    await this.context.setCategory(categories[0].media_type);
    let happenings = await AuthService.getHappeningEvents().then(response => response);
    await this.context.setHappenings(happenings);
    let fullUrl = 'http://image.tmdb.org/t/p/w1280/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
    if (this.context.categoryItems.length > 0) {
      let randomNumber = Math.floor(Math.random() * this.context.categoryItems.length);
      let imageUrlEnding = this.context.categoryItems[randomNumber].poster;
      fullUrl = `http://image.tmdb.org/t/p/original/${imageUrlEnding}`
    }
    document.body.style.background = `url('${fullUrl}`;

  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePageRoute} />
          <Route path="/category/:id" component={CategoryRoute} />
          <Route path="/:thread/:id" component={ThreadRoute} />
          <Route path="/new" component={NewThread} />
          <PublicOnlyRoute path="/login" component={LoginRoute} />
          <PublicOnlyRoute path="/register" component={RegisterRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    );
  }
}

export default App;
