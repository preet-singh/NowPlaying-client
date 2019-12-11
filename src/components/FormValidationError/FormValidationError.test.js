import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FormValidationError from './FormValidationError';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Form validation error testing', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <FormValidationError />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the error message', () => {
        const wrapper = shallow(<FormValidationError />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });

});