//Dependencies
import React, { Component } from 'react';

class FilterBox extends Component {
  render(){
    return (
      <form id="filterForm" name="filterForm">
        <label htmlFor="minimumYear" id="minimumYearLabel" name="minimumYearLabel">Earliest Year:</label>
        <input type="text" placeholder="1920" id="minimumYear" name="minimumYear" />
        <label htmlFor="latestYear" id="latestYearLabel" name="latestYearLabel">Latest Year:</label>
        <input type="text" placeholder={new Date().getFullYear()} id="latestYear" name="latestYear" />
        <label htmlFor="genre" id="genreLabel" name="genreLabel">Genre:</label>
        <input type="text" placeholder="Romance" />
        <label htmlFor="rating" id="ratingLabel" name="ratingLabel">Minimum Rating:</label>
        <select id="rating" name="rating" defaultValue="1">
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <label htmlFor="rating" id="ratingLabel" name="ratingLabel">Highest Family Rating:</label>
        <select id="familyRating" name="familyRating" defaultValue="R">
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