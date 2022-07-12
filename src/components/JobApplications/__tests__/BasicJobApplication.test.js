import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { BasicJobApplication } from '../components/BasicJobApplication';

const renderer = new ShallowRenderer();

describe('Basic Job Application tests', () => {
  it('renders correctly', () => {
    renderer.render(<BasicJobApplication />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
