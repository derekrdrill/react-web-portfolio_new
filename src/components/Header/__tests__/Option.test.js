import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Option, StyledMenuItem } from '../components/Option';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Option tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <Option
        option={{
          title: 'test',
          icon: <></>,
          href: 'www.fake.com',
          target: '_blank',
          divider: true,
          modal: null,
        }}
      />,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders Option conditional component correctly', () => {
    const optionHref = shallow(
      <Option
        option={{
          title: 'test',
          icon: <></>,
          href: 'www.fake.com',
          target: '_blank',
          modal: null,
        }}
      />,
    );

    const optionNoHref = shallow(
      <Option
        option={{
          title: 'test',
          icon: <></>,
          modal: null,
        }}
      />,
    );

    expect(optionHref.exists('.link')).toEqual(true);
    expect(optionHref.exists('.menu-item')).toEqual(true);

    expect(optionNoHref.exists('.link')).toEqual(false);
    expect(optionNoHref.exists('.menu-item')).toEqual(true);
  });

  it('renders StyledMenuItem styled component correctly', () => {
    const styledMenuItem = shallow(<StyledMenuItem />);
    const styledMenuItemDark = shallow(<StyledMenuItem darkMode />);

    expect(styledMenuItem.props().className).toEqual('sc-bczRLJ fcdcpK');
    expect(styledMenuItemDark.props().className).toEqual('sc-bczRLJ ivdBnD');
  });
});
