import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.only('Footer testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the footer', () => {
    const wrapper = shallow(<Footer />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});