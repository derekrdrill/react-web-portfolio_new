import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackList } from '../components/FeedbackList';
import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('Feedback List tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <FeedbackProvider>
        <FeedbackList />
      </FeedbackProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
