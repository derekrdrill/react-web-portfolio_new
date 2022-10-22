import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ErrorFallback from './ErrorFallback';

const renderer = new ShallowRenderer();

describe('ErrorFallback tests', () => {
  it('renders correctly', () => {
    renderer.render(<ErrorFallback />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
