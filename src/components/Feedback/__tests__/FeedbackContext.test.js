import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('FeedbackProvider with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<FeedbackProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
