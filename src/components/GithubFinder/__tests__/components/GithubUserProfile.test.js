import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserProfile } from '../../components/GithubUserProfile';
import { GithubProvider } from '../../context/GithubContext';

const renderer = new ShallowRenderer();

describe('Github Finder tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <GithubProvider>
        <GithubUserProfile />
      </GithubProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
