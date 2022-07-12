import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LeadInputForm } from '../components/LeadInputForm';

const renderer = new ShallowRenderer();

describe('Lead Input Form tests', () => {
  it('renders correctly', () => {
    renderer.render(<LeadInputForm />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
