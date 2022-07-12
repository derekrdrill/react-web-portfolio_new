import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { BasicModal } from './BasicModal';

const renderer = new ShallowRenderer();

describe('Basic Modal tests', () => {
  it('renders correctly', () => {
    renderer.render(<BasicModal open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
