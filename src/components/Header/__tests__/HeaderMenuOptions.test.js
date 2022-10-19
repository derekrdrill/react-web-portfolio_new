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
      { headerType: 'main', result: 'sc-bczRLJ' },
      { headerType: 'secondary', result: 'sc-gsnTZi' },
      { headerType: null, result: 'sc-gsnTZi' },
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

    expect(styledRouterLink.props().className).toEqual('sc-gsnTZi bOcqbP');
    expect(styledRouterLinkDark.props().className).toEqual('sc-gsnTZi cTHabj');
    expect(styledRouterLinkDarkList.props().className).toEqual('sc-gsnTZi lmJuMG');
    expect(styledRouterLinkList.props().className).toEqual('sc-gsnTZi bGqEMa');
    expect(styledRouterLinkMain.props().className).toEqual('sc-gsnTZi jVFxJI');
  });

  it('renders StyledScrollLink styled component correctly', () => {
    const styledScrollLink = shallow(<StyledScrollLink />);
    const styledScrollLinkDark = shallow(<StyledScrollLink darkMode />);
    const styledScrollLinkDarkList = shallow(<StyledScrollLink menuType='list' darkMode />);
    const styledScrollLinkList = shallow(<StyledScrollLink menuType='list' />);
    const styledScrollLinkMain = shallow(<StyledScrollLink menuType='main' />);

    expect(styledScrollLink.props().className).toEqual('sc-bczRLJ dOOtuV');
    expect(styledScrollLinkDark.props().className).toEqual('sc-bczRLJ euSIwx');
    expect(styledScrollLinkDarkList.props().className).toEqual('sc-bczRLJ grMrEI');
    expect(styledScrollLinkList.props().className).toEqual('sc-bczRLJ druRaA');
    expect(styledScrollLinkMain.props().className).toEqual('sc-bczRLJ dAZCum');
  });
});
