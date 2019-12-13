import React from 'react';
import ReactDOM from 'react-dom';
import FixedBar from './FixedBar';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.only('Fixed bar testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <FixedBar />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the play button within the fixed bar', () => {
    const wrapper = shallow(<FixedBar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});