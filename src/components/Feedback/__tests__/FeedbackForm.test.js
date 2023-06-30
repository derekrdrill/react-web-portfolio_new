import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { FeedbackForm, RatingRadioControl } from '../components/FeedbackForm';
import {
  getFeedbackReviewLabel,
  getSubmitButtonLabel,
  isReviewButtonDisabled,
} from '../components/FeedbackForm';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Feedback Form tests', () => {
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
      addFeedbackItem: '',
      feedbackEdit: '',
      updateFeedbackItem: '',
    });

    renderer.render(<FeedbackForm />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders RatingRadioControl styled component correctly', () => {
    const ratingRadioControl = shallow(<RatingRadioControl />);
    const ratingRadioControlChecked = shallow(<RatingRadioControl checked />);

    expect(ratingRadioControl.props().className).toEqual('sc-fqkvVR jXQJxZ');
    expect(ratingRadioControlChecked.props().className).toEqual('sc-fqkvVR doYZOv');
  });

  it('runs getFeedbackReviewLabel correctly', () => {
    expect(getFeedbackReviewLabel(true)).toEqual('Edit review');
    expect(getFeedbackReviewLabel(false)).toEqual('Write a review');
  });

  it('runs getSubmitButtonLabel correctly', () => {
    expect(getSubmitButtonLabel(true)).toEqual('Update ');
    expect(getSubmitButtonLabel(false)).toEqual('Submit ');
  });

  it('runs isReviewButtonDisabled correctly', () => {
    expect(isReviewButtonDisabled(true, 1)).toEqual(false);
    expect(isReviewButtonDisabled(false, 1)).toEqual(true);
    expect(isReviewButtonDisabled(false, '1')).toEqual(true);
  });
});
