import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ConnectWithMe } from '../components/ConnectWithMe';

const renderer = new ShallowRenderer();

describe('Connect with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<ConnectWithMe />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
