import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {
  DynamicColumnsList,
  getColumnName,
  getFirstGridContainerJustifyLG,
  getFirstGridItemOrderLG,
  getIconButtonChildren,
  getIconButtonColor,
  getSecondGridContainerJustifyLG,
  getSecondGridItemOrderLG,
} from '../../components/DynamicColumnsList';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const renderer = new ShallowRenderer();

describe('DynamicColumnsList with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<DynamicColumnsList columns={[{ id: 1, columnName: 'Test 1' }]} buttonClick={jest.fn()} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('runs getColumnName correctly', () => {
    expect(getColumnName('TEST')).toEqual('TEST');
    expect(getColumnName(null)).toEqual('');
  });

  it('runs getIconButtonChildren correctly', () => {
    expect(getIconButtonChildren(true)).toEqual(<AddCircleIcon />);
    expect(getIconButtonChildren(false)).toEqual(<RemoveCircleIcon />);
  });

  it('runs getIconButtonColor correctly', () => {
    expect(getIconButtonColor(true)).toEqual('success');
    expect(getIconButtonColor(false)).toEqual('error');
  });

  it('runs getFirstGridContainerJustifyLG correctly', () => {
    expect(getFirstGridContainerJustifyLG(true)).toEqual('flex-start');
    expect(getFirstGridContainerJustifyLG(false)).toEqual('flex-end');
  });

  it('runs getSecondGridContainerJustifyLG correctly', () => {
    expect(getSecondGridContainerJustifyLG(false)).toEqual('flex-start');
    expect(getSecondGridContainerJustifyLG(true)).toEqual('flex-end');
  });

  it('runs getFirstGridItemOrderLG correctly', () => {
    expect(getFirstGridItemOrderLG(true)).toEqual(1);
    expect(getFirstGridItemOrderLG(false)).toEqual(2);
  });

  it('runs getSecondGridItemOrderLG correctly', () => {
    expect(getSecondGridItemOrderLG(false)).toEqual(1);
    expect(getSecondGridItemOrderLG(true)).toEqual(2);
  });
});
