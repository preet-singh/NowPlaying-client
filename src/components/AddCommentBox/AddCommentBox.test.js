import React from 'react';
import ReactDOM from 'react-dom';
import AddCommentBox from './AddCommentBox';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Add comment box testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <AddCommentBox  />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the user comment box', () => {
    const wrapper = shallow(<AddCommentBox  />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});