/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import Form from '../components/common/Form';

describe('<Form />', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
    action: '',
    formFields: [
      {
        inputType: 'input',
        label: { label: 'Email', id: 'email' },
        input: {
          type: 'email', name: 'email', placeholder: 'username@example.com', required: 'required',
        },
      }, {
        inputType: 'input',
        label: { label: 'Password', id: 'pass' },
        input: {
          type: 'password', name: 'pass', placeholder: 'P@ssw0rd', required: 'required',
        },
      }, {
        inputType: 'button',
        button: { color: '', className: '' },
      },
    ],
  };
  it('renders the Form component', () => {
    const wrapper = shallow(<Form {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('calls onClick on Form submit', () => {
    const wrapper = shallow(<Form {...props} />);
    const form = wrapper.find('Form');
    form.simulate('submit');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
