import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Homepage, { HomePageText } from './Homepage';
import { getQCLogo } from './Homepage';

import qcLogoBlue from '../../assets/crown-blue.png';
import qcLogoWhite from '../../assets/crown-white.png';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Homepage tests', () => {
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

    renderer.render(<Homepage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders HomePageText styled component correctly', () => {
    const homePageText = shallow(<HomePageText />);
    const homePageTextDark = shallow(<HomePageText darkMode />);

    expect(homePageText.props().className).toEqual('sc-gueYoa eavQmY');
    expect(homePageTextDark.props().className).toEqual('sc-gueYoa hkAgZO');
  });

  it('runs getQCLogo', () => {
    expect(getQCLogo(true, qcLogoWhite, qcLogoBlue)).toEqual(qcLogoWhite);
    expect(getQCLogo(false, qcLogoWhite, qcLogoBlue)).toEqual(qcLogoBlue);
  });
});
