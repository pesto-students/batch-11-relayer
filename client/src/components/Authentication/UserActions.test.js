import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from './UserActions';

describe('<UserActions />', () => {
  it('renders the UserActions component', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toMatchSnapshot();
  });
});
