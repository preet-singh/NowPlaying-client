import React from 'react';
import ThreadDetails from './ThreadDetails.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadDetails component`, () => {

  let thread = 'movies'

  let id = 1

  it('renders the ThreadDetails', () => {
    const wrapper = shallow(<ThreadDetails thread={thread} id={id} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})