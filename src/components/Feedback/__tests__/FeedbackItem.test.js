import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { FeedbackItem, NumberDisplay } from '../components/FeedbackItem';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Feedback Item tests', () => {
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
      deleteFeedbackItem: { _id: 2, rating: 9, text: 'Pretty Good' },
      setFeedbackItems: [{ _id: 1, rating: 10, text: 'Nice' }],
    });

    renderer.render(<FeedbackItem />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('correctly renders NumberDisplay styled component', () => {
    const numberDisplay = shallow(<NumberDisplay />);
    const numberDisplayRed = shallow(<NumberDisplay bgColor='red' />);

    expect(numberDisplay.props().className).toEqual('sc-fsQiph lmhAaW');
    expect(numberDisplayRed.props().className).toEqual('sc-fsQiph iDZWzi');
  });
});
