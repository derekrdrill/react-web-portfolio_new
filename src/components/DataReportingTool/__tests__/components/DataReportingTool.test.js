import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DataReportingTool } from '../../components/DataReportingTool';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('DataReportingTool with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DataReportingTool />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  //   it('renders DarkLightModeIcon styled component correctly', () => {
  //     const darkLightModeIcon = shallow(<DarkLightModeIcon />);
  //     const darkLightModeIconDark = shallow(<DarkLightModeIcon darkMode />);

  //     expect(darkLightModeIcon.props().className).toEqual('sc-bczRLJ cFhdZs');
  //     expect(darkLightModeIconDark.props().className).toEqual('sc-bczRLJ iBihyU');
  //   });

  //   it('runs getIcon correctly', () => {
  //     expect(getIcon(true, faSun, faMoon)).toEqual(faSun);
  //     expect(getIcon(false, faSun, faMoon)).toEqual(faMoon);
  //   });
});
