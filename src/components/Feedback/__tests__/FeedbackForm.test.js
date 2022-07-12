import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackForm } from '../components/FeedbackForm';
import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('Feedback Form tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <FeedbackProvider>
        <FeedbackForm />
      </FeedbackProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
