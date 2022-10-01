import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { FilterInput } from '../components/FilterInput';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('FilterInput tests', () => {
  it('renders correctly', () => {
    renderer.render(<FilterInput />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders FilterInput  correctly', () => {
    const filterInput = shallow(
      <FilterInput filtersDisplay handleFilter={jest.fn()} headerID='test' />,
    );
    const filterInputNoDisplay = shallow(<FilterInput handleFilter={jest.fn()} headerID='test' />);

    expect(filterInput.props().className).toEqual('filter');
    expect(filterInputNoDisplay.props().className).toEqual(undefined);
    expect(filterInputNoDisplay.props()).toEqual({});
  });
});
