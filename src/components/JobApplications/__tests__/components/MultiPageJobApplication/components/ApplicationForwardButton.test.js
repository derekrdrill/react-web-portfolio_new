import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  ApplicationForwardButton,
  StyledButton,
  getForwardButtonTitle,
} from '../../../../components/MultiPageJobApplication/components/ApplicationForwardButton';

import { ADVANCED_JOB_APP_INPUTS } from '../../../../constants/ADVANCED_JOB_APP_INPUTS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('ApplicationForwardButton tests', () => {
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
    renderer.render(<ApplicationForwardButton />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders StyledButton styled component correctly', () => {
    const styledButton = shallow(<StyledButton />);
    const styledButtonDark = shallow(<StyledButton darkMode />);

    expect(styledButton.props().className).toEqual('sc-bcXHqe jcTuIk');
    expect(styledButtonDark.props().className).toEqual('sc-bcXHqe wrsjF');
  });

  it('renders forward or submit button', () => {
    const forwardOrSubmitButtonTests = [
      { page: 1, maxPage: 2, result: 'sc-bcXHqe' },
      { page: 2, maxPage: 2, result: 'sc-gswNZR' },
    ];

    forwardOrSubmitButtonTests.forEach(({ page, maxPage, result }) => {
      useContextMock.mockReturnValue({ darkMode: true });
      renderer.render(
        <ApplicationForwardButton page={page} maxPage={maxPage} inputs={ADVANCED_JOB_APP_INPUTS} />,
      );
      const render = renderer.getRenderOutput();
      const className = render.type.componentStyle.componentId;

      expect(className).toEqual(result);
    });
  });

  it('runs getForwardButtonTitle', () => {
    const forwardButtonTests = [
      { page: 1, maxPage: 3, result: `GO TO ${ADVANCED_JOB_APP_INPUTS[1].title}\u00A0\u00A0` },
      { page: 9, maxPage: 10, result: `GO TO REVIEW\u00A0\u00A0` },
    ];

    forwardButtonTests.forEach(({ maxPage, page, result }) => {
      expect(getForwardButtonTitle(ADVANCED_JOB_APP_INPUTS, maxPage, page)).toEqual(result);
    });
  });
});
