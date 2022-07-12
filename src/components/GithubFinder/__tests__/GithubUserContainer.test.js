import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUsersContainer } from '../components/GithubUsersContainer';
import { GithubProvider } from '../context/GithubContext';

const renderer = new ShallowRenderer();

describe('Github Users Container tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <GithubProvider>
        <GithubUsersContainer />
      </GithubProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
