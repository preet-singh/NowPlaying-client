import React from 'react';
import ReactDOM from 'react-dom';
import Directory from './Directory';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Directory testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Directory />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the categories within the directory', () => {
    const wrapper = shallow(<Directory />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});