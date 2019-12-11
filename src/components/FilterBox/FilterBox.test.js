import React from 'react';
import ReactDOM from 'react-dom';
import FilterBox from './FilterBox';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Filter box testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <FilterBox />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the filter box UI', () => {
    const wrapper = shallow(<FilterBox />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});