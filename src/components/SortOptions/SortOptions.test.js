import React from 'react';
import SortOptions from './SortOptions.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`SortOptions component`, () => {

  it('renders the RegisterForm', () => {
    const wrapper = shallow(<SortOptions />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})