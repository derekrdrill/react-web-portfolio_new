import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackItem } from '../components/FeedbackItem';
import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('Feedback Item tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <FeedbackProvider>
        <FeedbackItem />
      </FeedbackProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
