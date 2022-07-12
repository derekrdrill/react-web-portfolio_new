import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserRepos } from '../components/GithubUserRepos';
import { GithubProvider } from '../context/GithubContext';

const renderer = new ShallowRenderer();

describe('Github User Repos tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <GithubProvider>
        <GithubUserRepos />
      </GithubProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
