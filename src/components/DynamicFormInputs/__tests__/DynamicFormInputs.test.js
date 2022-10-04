import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { DynamicFormInputs } from '../components/DynamicFormInputs';
import { CONNECT_FORM_INPUTS } from '../../ConnectWithMe/constants/CONNECT_FORM_INPUTS';

const renderer = new ShallowRenderer();

describe('DynamicFormInputs tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <DynamicFormInputs
        form={{ firstName: '', lastName: '', email: '', phone: '' }}
        inputs={CONNECT_FORM_INPUTS[0].inputs}
        setForm={jest.fn()}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
