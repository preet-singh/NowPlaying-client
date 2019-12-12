import React from 'react';
import ThreadItem from './ThreadItem.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadItem component`, () => {

  let details = {
      id: 20019,
      title: 'Avengers',
      poster: '2nvwe9d15fan3'
  }

  it('renders the ThreadItem', () => {
    const wrapper = shallow(<ThreadItem key={1} details={details}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})