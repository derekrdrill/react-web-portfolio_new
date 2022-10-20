import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Feedback from '../Feedback';

const renderer = new ShallowRenderer();

describe('Feedback tests', () => {
  it('renders correctly', () => {
    renderer.render(<Feedback />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
