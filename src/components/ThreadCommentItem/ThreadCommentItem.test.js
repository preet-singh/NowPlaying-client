import React from 'react';
import ThreadCommentItem from './ThreadCommentItem.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadCommentItem component`, () => {

  it('renders the ThreadCommentItem', () => {
    const wrapper = shallow(<ThreadCommentItem />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})