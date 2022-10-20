import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Sandbox from '../Sandbox';

const renderer = new ShallowRenderer();

describe('Sandbox tests', () => {
  it('renders correctly', () => {
    renderer.render(<Sandbox />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
