//Dependencies
import React from 'react';

//Components
import SearchBar from '../SearchBar/SearchBar';


function Directory() {
  return(
    <div className="Directory">
      <section className="directory-box">
        <h3>Movies</h3>
        <div className="directory-dropdown">
          <ul className="directory-list">
            <li>Books</li>
            <li>Podcasts</li>
          </ul>
        </div>
      </section>
      <SearchBar />
    </div>
  );
}

export default Directory;