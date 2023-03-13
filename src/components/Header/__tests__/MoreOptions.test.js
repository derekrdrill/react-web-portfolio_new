/*** @jest-environment jsdom */

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { MoreOptions, StyledIcon, StyledMenu } from '../components/MoreOptions';

import { MORE_OPTIONS } from '../constants/MORE_OPTIONS';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('More Options tests', () => {
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

    renderer.render(<MoreOptions moreOptions={MORE_OPTIONS} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders StyledIcon styled component correctly', () => {
    const styledIcon = shallow(<StyledIcon />);
    const styledIconDark = shallow(<StyledIcon darkMode />);

    expect(styledIcon.props().className).toEqual('sc-fbJfA eVNmfy');
    expect(styledIconDark.props().className).toEqual('sc-fbJfA dweWQa');
  });

  it('renders StyledMenu styled component correctly', () => {
    const styledMenu = shallow(<StyledMenu />);
    const styledMenuDark = shallow(<StyledMenu darkMode />);

    expect(styledMenu.props().className).toEqual('sc-csCMJt dzYCX');
    expect(styledMenuDark.props().className).toEqual('sc-csCMJt jHULKV');
  });
});


