import React from 'react';
import SearchBar from './SearchBar.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`SearchBar component`, () => {

  it('renders the SearchBar', () => {
    const wrapper = shallow(<SearchBar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})