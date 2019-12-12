import React from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './LoginBox';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
//import { useLocation } from 'react-router-dom';
import toJson from 'enzyme-to-json'

describe('Login box testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <LoginBox />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the login box', () => {
    const wrapper = shallow(<LoginBox />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});