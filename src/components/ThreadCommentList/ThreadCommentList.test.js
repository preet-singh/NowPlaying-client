import React from 'react';
import ThreadCommentList from './ThreadCommentList.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`ThreadCommentList component`, () => {

  it('renders the ThreadCommentList', () => {
    const wrapper = shallow(<ThreadCommentList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})