import React from 'react';
import ThreadsList from './ThreadsList.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadsList component`, () => {

  it('renders the ThreadsList', () => {
    const wrapper = shallow(<ThreadsList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})