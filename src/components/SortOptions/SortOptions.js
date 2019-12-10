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
          <button type="button" onClick={() => this.setState({displayFilter: true})}>Filter</button>
        </div>
        {this.state.displayFilter ? <FilterBox /> : ''}
        <p><Link to="/new">Don't see what you want? Search for it and create it yourself!</Link></p>
      </div>
    );
  }
}

export default SortOptions;