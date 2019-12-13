//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';
import './SortOptions.css'

//Components
import FilterBox from '../FilterBox/FilterBox';

//Utilities
import UserContext from '../../utils/context';

class SortOptions extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false
    }
  }

  render() {
    return(
      <div className="sortOptions">
        <div id="filterButton">
          <button type="button" className="black-button margin10 filter-button" onClick={() => this.setState({displayFilter: true})}>Filter</button>
          <button type="button" className="black-button margin10 filter-button" onClick={() => this.context.setSearchedCategoryItems(this.context.categoryItems)}>Clear</button>
        </div>
        {this.state.displayFilter ? <FilterBox /> : ''}
        <p className="black-bg"><Link to="/new">Movie not here? <span className="block bold">Find your movie!</span></Link></p>
      </div>
    );
  }
}

export default SortOptions;