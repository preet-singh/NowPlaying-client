import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Happenings from './Happenings';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Happenings testing', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Happenings />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the hapenning table', () => {
        const wrapper = shallow(<Happenings />)
        expect(toJson(wrapper)).toMatchSnapshot()
    });

});