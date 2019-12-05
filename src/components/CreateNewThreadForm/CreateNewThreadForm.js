//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Utilities
import UserContext from '../../utils/context';

class CreateNewThreadForm extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      existError: false
    }
  }

  //Check if the item exists in our database alraedy. 
  //If not, query the 3rd-party API
  //gather the details
  //send them to the NowPlaying server
  //gather the response
  //direct user to the new link
  checkForm = (e) => {
    e.preventDefault();
    this.setState({existError: false});
    let find = this.context.categoryItems.find(item => item.title.toLowerCase() === this.state.title.toLowerCase());
    if (find) {
      this.context.setSearchedCategoryItems([find])
      this.setState({existError: find})
    }
    else {
      
    }

  }

  threadExists = () => {
    return(
      <div className="error">
        <h3>There is already a thread that exists!</h3>
        <p>Visit the link below or search again for something new!</p>
      </div>
    );
  }

  render() {
    return(
      <form className="CreateNewThreadForm" onSubmit={(e) => this.checkForm(e)}>
        <legend>Start a new thread!</legend>
        {this.state.existError? this.threadExists() : ''}
        <label htmlFor="newThreadTitle" id="newThreadTitleLabel" name="newThreadTitleLabel">{this.context.category} title:</label>
        <input type="text" id="newThreadTitle" name="newThreadTitle" placeholder="Game of Thrones" onChange={(e) => this.setState({title: e.target.value})} />
        <button type="submit">Create!</button>
      </form>
    );
  }
}

export default CreateNewThreadForm;