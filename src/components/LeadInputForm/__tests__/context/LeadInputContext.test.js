import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LeadInputProvider } from '../../context/LeadInputContext';

const renderer = new ShallowRenderer();

describe('LeadInputProvider tests', () => {
  it('renders correctly', () => {
    renderer.render(<LeadInputProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
