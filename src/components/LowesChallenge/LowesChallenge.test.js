import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { LowesChallenge } from './LowesChallenge';

const renderer = new ShallowRenderer();

describe('Lowes Challenge tests', () => {
  it('renders correctly', () => {
    renderer.render(<LowesChallenge />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
