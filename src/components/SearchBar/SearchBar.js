import React from 'react'
import UserContext from '../../utils/context';
import {withRouter} from 'react-router-dom';
import './SearchBar.css'

class SearchBar extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state={

    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let find = this.context.categoryItems.filter(item => item.title.toLowerCase().includes(this.state.title.toLowerCase())) || [];
    await this.context.setSearchedCategoryItems(find);
    this.props.history.push(`/category/${this.context.categoryID}`)
  }
  render() {
    return (
      <form className="SearchBar" onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" placeholder='Frozen' id="searchBar" name="searchBar" aria-label="search bar" onChange={(e) => this.setState({title: e.target.value})} />
        <span className="search-icon" onClick={(e) => this.handleSubmit(e)}><img src="https://i.imgur.com/vSQGka1.png" alt="search icon" /></span>
      </form>
    )
  }
}

export default withRouter(SearchBar);
