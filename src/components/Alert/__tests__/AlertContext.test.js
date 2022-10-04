import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AlertProvider } from '../context/AlertContext';

const renderer = new ShallowRenderer();

describe('AlertProvider tests', () => {
  it('renders correctly', () => {
    renderer.render(<AlertProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
