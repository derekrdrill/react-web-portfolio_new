import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { SearchButtonIcon } from '../components/SearchButtonIcon';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('SearchButtonIcon tests', () => {
  it('renders correctly', () => {
    renderer.render(<SearchButtonIcon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders SearchButtonIcon  correctly', () => {
    const searchButtonIcon = shallow(<SearchButtonIcon />);
    const searchButtonIconFiltersDisplay = shallow(<SearchButtonIcon filtersDisplay />);

    expect(searchButtonIcon.props().className).toEqual('search-on');
    expect(searchButtonIconFiltersDisplay.props().className).toEqual('search-off');
  });
});
