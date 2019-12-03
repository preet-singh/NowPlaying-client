//Dependencies
import React from 'react';
import {withRouter, Link} from 'react-router-dom';

//Components
import SearchBar from '../SearchBar/SearchBar';
import UserContext from '../../utils/context';
import AuthService from '../../utils/auth-service';


class Directory extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  getCategoryList = (categoryList, category) => {
    let categoryListNames = categoryList.map(item => item.media_type) || [];
    let selectOptions = [];
    categoryListNames.forEach((item,index) => {
        selectOptions.push(<option value={item} key={item}>{item}</option>)
    });
    return selectOptions;
  }

  render() {
    let categoryList = this.context.categoryList || [];
    let category = this.context.category || ''
    return(
      <div className="Directory">
        <section className="directory-box">
          <div className="directory-dropdown">
            <select onChange={(e) => this.context.setCategory(e.target.value)}>
              {this.getCategoryList(categoryList, category)}
            </select>
          </div>
        </section>
        <SearchBar />
      </div>
    );
  }
}

export default withRouter(Directory);