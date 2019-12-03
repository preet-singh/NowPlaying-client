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
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePageRoute} />
          <Route path="/category/:id" component={CategoryRoute} />
          <Route path="/:thread/:id" component={ThreadRoute} />
          <PublicOnlyRoute path="/login" component={LoginRoute} />
          <PublicOnlyRoute path="/register" component={RegisterRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    );
  }
}

export default App;
