import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackList } from '../components/FeedbackList';

const renderer = new ShallowRenderer();

describe('Feedback List tests', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });
  it('renders correctly', () => {
    useContextMock.mockReturnValue({
      feedbackItems: [
        { _id: 1, rating: 10, text: 'Nice' },
        { _id: 2, rating: 9, text: 'Pretty Good' },
      ],
    });

    renderer.render(<FeedbackList />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
