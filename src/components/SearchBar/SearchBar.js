import React from 'react'
import './SearchBar.css'

function SearchBar() {
  return (
    <div className="SearchBar">
      <input type="text" placeholder='ex. Frozen' id="searchBar" name="searchBar" aria-label="search bar" />
    </div>
  )
}

export default SearchBar;
