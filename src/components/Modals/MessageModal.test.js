import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { MessageModal } from './MessageModal';

const renderer = new ShallowRenderer();

describe('Message Modal tests', () => {
  it('renders correctly', () => {
    renderer.render(<MessageModal open />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
