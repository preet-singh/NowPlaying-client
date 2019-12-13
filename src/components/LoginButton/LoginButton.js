//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Context
import UserContext from '../../utils/context';

//Style
import './LoginButton.css'
import TokenService from '../../utils/token-service';

class LoginButton extends React.Component {
  static contextType = UserContext;
  render(){
    return TokenService.hasAuthToken() ? 
          <div className="LoginButton">
                <Link to='/'><button type="button" id='logout_button' className={this.props.classNames} onClick={() => this.context.processLogout()}>
              LOGOUT <span>({this.context.user.username})</span>
            </button></Link>
          </div>

    :
    
        <div className="LoginButton">
          <Link to="/login"><button type="button" className={this.props.classNames}>LOGIN</button></Link>
        </div>

  }
}

export default LoginButton;