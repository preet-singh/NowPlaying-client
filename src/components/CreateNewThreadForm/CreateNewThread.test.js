import React from 'react';
import ReactDOM from 'react-dom';
import CreateNewThreadForm from './CreateNewThreadForm';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Create new thread testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <CreateNewThreadForm />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders a new thread created by a user', () => {
    const wrapper = shallow(<CreateNewThreadForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});