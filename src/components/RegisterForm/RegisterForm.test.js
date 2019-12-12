import React from 'react';
import RegisterForm from './RegisterForm.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`RegisterForm component`, () => {

  let history = {}

  it('renders the RegisterForm', () => {
    const wrapper = shallow(<RegisterForm history={history}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})