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
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';


//CSS
import './App.css';

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}


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
    let fullUrl = 'http://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg'
    if (this.context.categoryItems.length > 0) {
      let categoryItemsBackdrop = this.context.categoryItems.map(item => item.backdrop);
      let uniqueBackdrops = categoryItemsBackdrop.filter(onlyUnique)
      let randomNumber = Math.floor(Math.random() * uniqueBackdrops.length);
      let imageUrlEnding = uniqueBackdrops[randomNumber];
      fullUrl = `http://image.tmdb.org/t/p/original/${imageUrlEnding}`
    }
    document.body.style.background = `fixed center center url('${fullUrl}`;
    this.context.setBackground(fullUrl);

  }

  render() {
    return (
      <div className="App">
        <LandingPage />
        <Switch>
          <Route exact path="/" component={HomePageRoute} />
          <Route path="/category/:id" component={CategoryRoute} />
          <Route path="/:thread/:id" component={ThreadRoute} />
          <PrivateOnlyRoute path="/new" component={NewThread} />
          <PublicOnlyRoute path="/login" component={LoginRoute} />
          <PublicOnlyRoute path="/register" component={RegisterRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
