//Dependencies
import React from 'react';
import {withRouter, Link} from 'react-router-dom';

//Components
import SearchBar from '../SearchBar/SearchBar';
import UserContext from '../../utils/context';
import AuthService from '../../utils/auth-service';

//Style
import './Directory.css';


class Directory extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      firstClick: false
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

  checkSelectChange = async e => {
      if (this.state.firstClick) {
      await this.context.setCategory(e.target.value);
      this.props.history.push(`/category/${this.context.categoryID}`)
      }
      else {
        this.setState({firstClick: !this.state.firstClick})
      }
  }

  render() {
    let categoryList = this.context.categoryList || [];
    let category = this.context.category || ''
    return(
      <div className="Directory">
        <h3><Link to="/category/1"> {`<`} MOVIES </Link></h3>
        <SearchBar />
      </div>
    );
  }
}

export default withRouter(Directory);