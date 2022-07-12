import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UseMemoExample } from '../components/UseMemoExample';

const renderer = new ShallowRenderer();

describe('Use Memo Example tests', () => {
  it('renders correctly', () => {
    renderer.render(<UseMemoExample />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
