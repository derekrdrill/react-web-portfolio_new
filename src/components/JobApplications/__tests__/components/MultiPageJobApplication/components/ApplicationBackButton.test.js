import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  ApplicationBackButton,
  StyledButton,
  getBackButtonTitle,
} from '../../../../components/MultiPageJobApplication/components/ApplicationBackButton';

import { ADVANCED_JOB_APP_INPUTS } from '../../../../constants/ADVANCED_JOB_APP_INPUTS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('ApplicationBackButton tests', () => {
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
    renderer.render(<ApplicationBackButton />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders StyledButton styled component correctly', () => {
    const styledButton = shallow(<StyledButton />);
    const styledButtonDark = shallow(<StyledButton darkMode />);

    expect(styledButton.props().className).toEqual('sc-bcXHqe jcTuIk');
    expect(styledButtonDark.props().className).toEqual('sc-bcXHqe wrsjF');
  });

  it('runs getBackButtonTitle', () => {
    const backButtonTests = [
      { page: 1, result: `\u00A0\u00A0BACK TO LANDING PAGE` },
      { page: 2, result: `\u00A0\u00A0BACK TO ${ADVANCED_JOB_APP_INPUTS[0].title}` },
    ];

    backButtonTests.forEach(({ page, result }) => {
      expect(getBackButtonTitle(ADVANCED_JOB_APP_INPUTS, page)).toEqual(result);
    });
  });
});
