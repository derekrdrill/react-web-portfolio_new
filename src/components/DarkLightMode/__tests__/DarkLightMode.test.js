import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import DarkLightMode, { DarkLightModeIcon } from '../components/DarkLightMode';
import { getIcon } from '../components/DarkLightMode';

import { faSun, faMoon } from '@fortawesome/fontawesome-free-solid';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('DarkLightMode with me tests', () => {
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
    useContextMock.mockReturnValue({ darkMode: true, darkLightModeDispatch: jest.fn() });
    renderer.render(<DarkLightMode />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders DarkLightModeIcon styled component correctly', () => {
    const darkLightModeIcon = shallow(<DarkLightModeIcon />);
    const darkLightModeIconDark = shallow(<DarkLightModeIcon darkMode />);

    expect(darkLightModeIcon.props().className).toEqual('sc-aXZVg bnxTSw');
    expect(darkLightModeIconDark.props().className).toEqual('sc-aXZVg ftzpwo');
  });

  it('runs getIcon correctly', () => {
    expect(getIcon(true, faSun, faMoon)).toEqual(faSun);
    expect(getIcon(false, faSun, faMoon)).toEqual(faMoon);
  });
});
