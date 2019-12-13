//Dependencies
import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

//Components
import SearchBar from '../SearchBar/SearchBar';
import UserContext from '../../utils/context';

//Style
import './Directory.css';

library.add(
  fas
);


const backArrow = findIconDefinition({ prefix: 'fas', iconName: 'arrow-left' })
const backArrowIcon = icon(backArrow);

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
    return(
      <div className="Directory">
        <div className="return-directory"><h3><Link to="/category/1"><FontAwesomeIcon className="back-icon" icon={backArrowIcon} /> MOVIES </Link></h3></div>
        <SearchBar />
      </div>
    );
  }
}

export default withRouter(Directory);