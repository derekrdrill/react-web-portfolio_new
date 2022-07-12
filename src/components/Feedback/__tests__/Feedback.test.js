import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Feedback } from '../Feedback';
import { FeedbackProvider } from '../context/FeedbackContext';

const renderer = new ShallowRenderer();

describe('Feedback tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <FeedbackProvider>
        <Feedback />
      </FeedbackProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
