import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { HeaderMenu } from '../components/HeaderMenu';

const renderer = new ShallowRenderer();

describe('Header Menu tests', () => {
  it('renders correctly', () => {
    renderer.render(<HeaderMenu />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
