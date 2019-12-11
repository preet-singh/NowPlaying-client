import React from 'react';
import RegisterForm from './RegisterForm.js';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`RegisterForm component`, () => {

  it('renders the RegisterForm', () => {
    const wrapper = shallow(<RegisterForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})