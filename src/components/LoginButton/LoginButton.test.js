import React from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './LoginButton';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json'



describe('Login button testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LoginButton /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <LoginButton />
            </MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

})