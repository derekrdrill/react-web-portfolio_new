import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { FeedbackStats } from '../components/FeebackStats';
import { getAverage, getAverageFixed } from '../components/FeebackStats';

const renderer = new ShallowRenderer();

describe('Feedback Stats tests', () => {
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

    renderer.render(<FeedbackStats />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('runs getAverage correctly', () => {
    expect(
      getAverage([
        { _id: 1, rating: 10, text: 'Nice' },
        { _id: 2, rating: 9, text: 'Pretty Good' },
      ]),
    ).toEqual(9.5);
  });

  it('runs getAverageFixed correctly', () => {
    expect(
      getAverageFixed([
        { _id: 1, rating: null, text: 'Nice' },
        { _id: 2, rating: null, text: 'Pretty Good' },
      ]),
    ).toEqual(0);

    expect(
      getAverageFixed([
        { _id: 1, text: 'Nice' },
        { _id: 2, text: 'Pretty Good' },
      ]),
    ).toEqual(0);

    expect(
      getAverageFixed([
        { _id: 1, rating: 10.1, text: 'Nice' },
        { _id: 2, rating: 9.92, text: 'Pretty Good' },
      ]),
    ).toEqual('10.0');

    expect(
      getAverageFixed([
        { _id: 1, rating: 10, text: 'Nice' },
        { _id: 2, rating: 9, text: 'Pretty Good' },
      ]),
    ).toEqual('9.5');
  });
});
