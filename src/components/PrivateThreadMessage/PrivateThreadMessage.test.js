import React from 'react';
import PrivateThreadMessage from './PrivateThreadMessage.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`PrivateThreadMessage component`, () => {

  it('renders the PrivateThreadMessage', () => {
    const wrapper = shallow(<PrivateThreadMessage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})