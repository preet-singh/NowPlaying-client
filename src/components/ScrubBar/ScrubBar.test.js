import React from 'react';
import ScrubBar from './ScrubBar.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ScrubBar component`, () => {

  it('renders the ScrubBar', () => {
    const wrapper = shallow(<ScrubBar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})