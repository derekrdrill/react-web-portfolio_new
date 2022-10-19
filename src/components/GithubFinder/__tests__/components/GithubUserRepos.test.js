import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserRepos } from '../../components/GithubUserRepos';

const renderer = new ShallowRenderer();

describe('GithubUserRepos tests', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it('renders correctly', () => {
    useContextMock.mockReturnValue({
      repos: [
        {
          size: '100',
          watchers: '100',
          stargazers_count: '100',
          open_issues: '2',
          forks_count: '20',
        },
      ],
    });
    renderer.render(<GithubUserRepos />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
