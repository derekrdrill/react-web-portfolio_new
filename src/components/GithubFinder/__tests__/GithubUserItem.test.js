import 'regenerator-runtime/runtime';

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserItem } from '../components/GithubUserItem';
import { GithubProvider } from '../context/GithubContext';

const renderer = new ShallowRenderer();

describe('Github User Item tests', () => {
  it('renders correctly', () => {
    renderer.render(
      <GithubProvider>
        <GithubUserItem />
      </GithubProvider>,
    );
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
