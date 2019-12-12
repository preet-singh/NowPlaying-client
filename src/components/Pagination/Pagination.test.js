import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Pagination testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Pagination />
        </MemoryRouter>, 
    div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('paginates the posts', () => {
    const wrapper = shallow(<Pagination />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
  
});