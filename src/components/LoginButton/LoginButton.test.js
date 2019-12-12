import React from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './LoginButton';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Login button testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <LoginButton />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the playbutton', () => {
    const wrapper = shallow(<LoginButton />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});