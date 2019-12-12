import React from 'react';
import ThreadCategory from './ThreadCategory.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadCategory component`, () => {

  it('renders the ThreadCategory', () => {
    const wrapper = shallow(<ThreadCategory />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})