import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { HeaderMenu } from '../components/HeaderMenu';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Header Menu tests', () => {
  it('renders correctly', () => {
    renderer.render(<HeaderMenu />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders HeaderMenu as list', () => {
    const headerMenu = shallow(<HeaderMenu headerType='main' menuType='main' />);
    const headerMenuList = shallow(<HeaderMenu headerType='main' menuType='list' />);

    expect(headerMenu.exists('.list-item')).toEqual(false);
    expect(headerMenuList.exists('.list-item')).toEqual(true);
  });
});
