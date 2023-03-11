import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DynamicList, DynamicListButton } from './DynamicList';
import { addRow, removeRow } from './DynamicList';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('DynamicList tests', () => {
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

    renderer.render(<DynamicList children={<div></div>} title='test dynamic list' />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders DynamicListButton styled component correctly', () => {
    const dynamicListButton = shallow(<DynamicListButton />);
    const dynamicListButtonlIconColor = shallow(<DynamicListButton iconcolor='white' />);
    const dynamicListButtonDark = shallow(<DynamicListButton darkMode />);

    expect(dynamicListButton.props().className).toEqual('sc-guDLRT RCnwQ');
    expect(dynamicListButtonlIconColor.props().className).toEqual('sc-guDLRT jvHKYH');
    expect(dynamicListButtonDark.props().className).toEqual('sc-guDLRT jXbTCM');
  });

  it('runs addRow', () => {
    expect(addRow([{ id: 2 }], jest.fn())).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('runs removeRow', () => {
    expect(removeRow(2, [{ id: 2 }, { id: 3 }], jest.fn())).toEqual([{ id: 3 }]);
  });
});
