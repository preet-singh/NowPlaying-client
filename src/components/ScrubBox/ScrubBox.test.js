import React from 'react';
import ScrubBox from './ScrubBox.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ScrubBox component`, () => {

  it('renders the ScrubBox', () => {
    const wrapper = shallow(<ScrubBox />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})