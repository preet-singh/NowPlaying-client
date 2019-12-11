import React from 'react';
import PlayButton from './PlayButton.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`Playbutton component`, () => {

  it('renders the playbutton', () => {
    const wrapper = shallow(<PlayButton />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})