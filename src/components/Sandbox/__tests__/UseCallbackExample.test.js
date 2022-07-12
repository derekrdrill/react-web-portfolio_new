import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UseCallbackExample } from '../components/UseCallbackExample';

const renderer = new ShallowRenderer();

describe('Use Callback Example tests', () => {
  it('renders correctly', () => {
    renderer.render(<UseCallbackExample />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
