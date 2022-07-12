import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { DynamicFormInputs } from './DynamicFormInputs';
import { CONNECT_FORM_INPUTS } from '../../components/ConnectWithMe/constants/CONNECT_FORM_INPUTS';

const renderer = new ShallowRenderer();

describe('Connect with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DynamicFormInputs inputs={CONNECT_FORM_INPUTS[0].inputs} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
