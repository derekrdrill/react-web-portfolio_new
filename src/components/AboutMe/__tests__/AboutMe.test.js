import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AboutMe } from '../components/AboutMe';

const renderer = new ShallowRenderer();

describe('About Me tests', () => {
  it('renders correctly', () => {
    renderer.render(<AboutMe />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
