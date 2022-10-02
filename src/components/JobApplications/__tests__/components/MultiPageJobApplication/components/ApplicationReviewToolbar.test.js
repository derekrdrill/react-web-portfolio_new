import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  ApplicationReviewToolbar,
  StyledToolbar,
} from '../../../../components/MultiPageJobApplication/components/ApplicationReviewToolbar';

import { ADVANCED_JOB_APP_INPUTS } from '../../../../constants/ADVANCED_JOB_APP_INPUTS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('ApplicationReviewToolbarIcon tests', () => {
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
    useContextMock.mockReturnValue({ darkMode: true });
    renderer.render(<ApplicationReviewToolbar />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders ApplicationReviewToolbar correctly', () => {
    const reviewJobAppToolbarTests = [
      { page: 1, maxPage: 2, result: false },
      { page: 2, maxPage: 2, result: 'sc-bczRLJ' },
    ];

    useContextMock.mockReturnValue({ darkMode: true });

    reviewJobAppToolbarTests.forEach(({ page, maxPage, result }) => {
      renderer.render(
        <ApplicationReviewToolbar page={page} maxPage={maxPage} inputs={ADVANCED_JOB_APP_INPUTS} />,
      );
      const render = renderer.getRenderOutput();
      const renderType = render.type;

      if (renderType) {
        expect(renderType.componentStyle.componentId).toEqual(result);
      } else {
        expect(render).toEqual(result);
      }
    });
  });

  it('renders StyledToolbar styled component correctly', () => {
    const styledToolbar = shallow(<StyledToolbar />);
    const styledToolbarDark = shallow(<StyledToolbar darkMode />);

    expect(styledToolbar.props().className).toEqual('sc-bczRLJ gmAbkX');
    expect(styledToolbarDark.props().className).toEqual('sc-bczRLJ kBvzTo');
  });
});
