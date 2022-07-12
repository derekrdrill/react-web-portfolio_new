import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubFinder } from '../components/GithubFinder';
import { GithubProvider } from '../context/GithubContext';

const renderer = new ShallowRenderer();

describe('Github Finder tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <GithubProvider>
        <GithubFinder />
      </GithubProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
