//Dependencies
import React, { Component } from 'react';
import UserContext from '../../utils/context'

class FilterBox extends Component {
  static contextType = UserContext;

  constructor(props){
    super(props)
    this.state = {
      minimumYear: '',
      maximumYear: '',
      genre: '',
      rating: '',
      familyRating: '',
      error: null,
    }
  }
  
  componentDidMount(){
    this.context.setCategory(this.context.category)
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    let currentCategoryItems = this.context.categoryItems;

    if(this.state.minimumYear){
      currentCategoryItems = currentCategoryItems.filter(item => Number(this.state.minimumYear) <= Number(item.release_date.slice(0,4)))
    }


    return (
      <form id="filterForm" name="filterForm">
        <label htmlFor="minimumYear" id="minimumYearLabel" name="minimumYearLabel">Earliest Year:</label>
        <input 
          type="text" 
          placeholder="1920" 
          id="minimumYear" 
          name="minimumYear" 
          onChange={this.handleChange} 
        />
        <label htmlFor="latestYear" id="latestYearLabel" name="latestYearLabel">Latest Year:</label>
        <input 
          type="text" 
          placeholder={new Date().getFullYear()}
          id="latestYear"
          name="maximumYear" 
          onChange={this.handleChange} 
        />
        <label htmlFor="genre" id="genreLabel" name="genreLabel">Genre:</label>
        <input 
          type="text" 
          placeholder="Romance"
          name="genre"
          onChange={this.handleChange}   
        />
        <label htmlFor="rating" id="ratingLabel" name="ratingLabel">Minimum Rating:</label>
        <select 
          id="rating" 
          name="rating" 
          defaultValue="1"
          onChange={this.handleChange} 
        >
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <label htmlFor="rating" id="ratingLabel" name="ratingLabel">Highest Family Rating:</label>
        <select 
          id="familyRating" 
          name="familyRating" 
          defaultValue="R"
          onChange={this.handleChange} 
        >
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default FilterBox;