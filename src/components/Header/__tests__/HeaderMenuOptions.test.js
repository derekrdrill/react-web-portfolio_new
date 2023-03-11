import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  HeaderMenuOptions,
  StyledRouterLink,
  StyledScrollLink,
} from '../components/HeaderMenuOptions';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Header Menu Options tests', () => {
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

    renderer.render(<HeaderMenuOptions />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders correctly based on header type', () => {
    const headerTests = [
      { headerType: 'main', result: 'sc-beySbM' },
      { headerType: 'secondary', result: 'sc-guDLRT' },
      { headerType: null, result: 'sc-guDLRT' },
    ];

    headerTests.forEach(({ headerType, result }) => {
      useContextMock.mockReturnValue({ darkMode: true });
      renderer.render(<HeaderMenuOptions headerType={headerType} />);
      const render = renderer.getRenderOutput();
      expect(render.type.componentStyle.componentId).toEqual(result);
    });
  });

  it('renders StyledRouterLink styled component correctly', () => {
    const styledRouterLink = shallow(<StyledRouterLink />);
    const styledRouterLinkDark = shallow(<StyledRouterLink darkMode />);
    const styledRouterLinkDarkList = shallow(<StyledRouterLink menuType='list' darkMode />);
    const styledRouterLinkList = shallow(<StyledRouterLink menuType='list' />);
    const styledRouterLinkMain = shallow(<StyledRouterLink menuType='main' />);

    expect(styledRouterLink.props().className).toEqual('sc-guDLRT iYEoCH');
    expect(styledRouterLinkDark.props().className).toEqual('sc-guDLRT gSfkvT');
    expect(styledRouterLinkDarkList.props().className).toEqual('sc-guDLRT ihcoVi');
    expect(styledRouterLinkList.props().className).toEqual('sc-guDLRT gUcrXW');
    expect(styledRouterLinkMain.props().className).toEqual('sc-guDLRT tbiWc');
  });

  it('renders StyledScrollLink styled component correctly', () => {
    const styledScrollLink = shallow(<StyledScrollLink />);
    const styledScrollLinkDark = shallow(<StyledScrollLink darkMode />);
    const styledScrollLinkDarkList = shallow(<StyledScrollLink menuType='list' darkMode />);
    const styledScrollLinkList = shallow(<StyledScrollLink menuType='list' />);
    const styledScrollLinkMain = shallow(<StyledScrollLink menuType='main' />);

    expect(styledScrollLink.props().className).toEqual('sc-beySbM eqCUVJ');
    expect(styledScrollLinkDark.props().className).toEqual('sc-beySbM cOOqCF');
    expect(styledScrollLinkDarkList.props().className).toEqual('sc-beySbM cnXCaQ');
    expect(styledScrollLinkList.props().className).toEqual('sc-beySbM grDXqA');
    expect(styledScrollLinkMain.props().className).toEqual('sc-beySbM kuzRSC');
  });
});
