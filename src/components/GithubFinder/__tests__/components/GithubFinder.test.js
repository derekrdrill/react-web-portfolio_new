import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GithubFinder from '../../components/GithubFinder';

const renderer = new ShallowRenderer();

describe('Github Finder tests', () => {
  it('renders correctly', () => {
    renderer.render(<GithubFinder />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
