import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GithubProvider from '../../context/GithubContext';

const renderer = new ShallowRenderer();

describe('GithubProvider with me tests', () => {
  it('renders correctly', () => {
    renderer.render(<GithubProvider />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
