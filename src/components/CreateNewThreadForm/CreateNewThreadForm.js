//Dependencies
import React from 'react';

//Utilities
import UserContext from '../../utils/context';

class CreateNewThreadForm extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  checkForm = () => {
    
  }

  render() {
    return(
      <form className="CreateNewThreadForm" onSubmit={() => this.checkForm()}>
        <legend>Start a new thread!</legend>
        <label htmlFor="newThreadTitle" id="newThreadTitleLabel" name="newThreadTitleLabel">{this.context.category} title:</label>
        <input type="text" id="newThreadTitle" name="newThreadTitle" placeholder="Game of Thrones" onChange={(e) => this.setState({title: e.target.value})} />
        <button type="submit">Create!</button>
      </form>
    );
  }
}

export default CreateNewThreadForm;