import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MoveAllColumnsButton } from '../../components/MoveAllColumnsButton';

const renderer = new ShallowRenderer();

describe('MoveAllColumnsButton with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<MoveAllColumnsButton children='TEST' onClick={jest.fn()} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
