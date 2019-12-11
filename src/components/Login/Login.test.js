import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Login box testing', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the login form', () => {
        const wrapper = shallow(<Login />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });

});