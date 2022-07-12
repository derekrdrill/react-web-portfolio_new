import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Homepage } from './Homepage';

const renderer = new ShallowRenderer();

describe('Homepage tests', () => {
  it('renders correctly', () => {
    renderer.render(<Homepage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
