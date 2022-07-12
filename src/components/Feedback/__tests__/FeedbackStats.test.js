import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackStats } from '../components/FeebackStats';
import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('Feedback Stats tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <FeedbackProvider>
        <FeedbackStats />
      </FeedbackProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
