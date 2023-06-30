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
      { headerType: 'main', result: 'sc-aXZVg' },
      { headerType: 'secondary', result: 'sc-gEvEer' },
      { headerType: null, result: 'sc-gEvEer' },
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

    expect(styledRouterLink.props().className).toEqual('sc-gEvEer jPsCNh');
    expect(styledRouterLinkDark.props().className).toEqual('sc-gEvEer fIobTF');
    expect(styledRouterLinkDarkList.props().className).toEqual('sc-gEvEer hVgPVA');
    expect(styledRouterLinkList.props().className).toEqual('sc-gEvEer dBRWHc');
    expect(styledRouterLinkMain.props().className).toEqual('sc-gEvEer eIpwzm');
  });

  it('renders StyledScrollLink styled component correctly', () => {
    const styledScrollLink = shallow(<StyledScrollLink />);
    const styledScrollLinkDark = shallow(<StyledScrollLink darkMode />);
    const styledScrollLinkDarkList = shallow(<StyledScrollLink menuType='list' darkMode />);
    const styledScrollLinkList = shallow(<StyledScrollLink menuType='list' />);
    const styledScrollLinkMain = shallow(<StyledScrollLink menuType='main' />);

    expect(styledScrollLink.props().className).toEqual('sc-aXZVg bCNCrZ');
    expect(styledScrollLinkDark.props().className).toEqual('sc-aXZVg cCHlmh');
    expect(styledScrollLinkDarkList.props().className).toEqual('sc-aXZVg FlkfE');
    expect(styledScrollLinkList.props().className).toEqual('sc-aXZVg iLDToA');
    expect(styledScrollLinkMain.props().className).toEqual('sc-aXZVg kbBHZO');
  });
});
