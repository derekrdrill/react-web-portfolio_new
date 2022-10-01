import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { SortArrowIcon } from '../components/SortArrowIcon';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('SortArrowIcon tests', () => {
  it('renders correctly', () => {
    renderer.render(<SortArrowIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders SortArrowIcon  correctly', () => {
    const sortArrowIcon = shallow(<SortArrowIcon headerID='tes' sortColumn='test' />);
    const sortArrowIcon2 = shallow(
      <SortArrowIcon headerID='test' sortColumn='test' sortType='desc' />,
    );
    const sortArrowIcon3 = shallow(
      <SortArrowIcon headerID='test' sortColumn='test' sortType='asc' />,
    );
    const sortArrowIcon4 = shallow(
      <SortArrowIcon headerID='test' sortColumn='test' sortType='test' />,
    );

    expect(sortArrowIcon.props().className).toEqual(undefined);
    expect(sortArrowIcon2.props().className).toEqual('arrow-up');
    expect(sortArrowIcon3.props().className).toEqual('arrow-down');
    expect(sortArrowIcon4.props().className).toEqual(undefined);
  });
});
