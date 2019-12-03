//Dependencies
import React from 'react';

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
    }
  }
  
  getCategoryList = (categoryList, category) => {
    console.log(categoryList);
    console.log(category);
    let categoryListNames = categoryList.map(item => item.media_type) || [];
    console.log(categoryListNames);
    let allExceptCurrent = categoryListNames.filter(item => item.toLowerCase() !== category.toLowerCase()) || [];
    let selectOptions = [];
    selectOptions.push(<option value={category}>{category}</option>);
    allExceptCurrent.forEach(item => {
      selectOptions.push(<option value={item}>{item}</option>)
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

export default Directory;