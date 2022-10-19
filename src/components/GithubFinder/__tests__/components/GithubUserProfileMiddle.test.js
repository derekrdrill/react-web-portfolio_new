import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserProfileMiddle } from '../../components/GithubUserProfileMiddle';

const renderer = new ShallowRenderer();

describe('GithubUserProfileMiddle tests', () => {
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
      user: { following: 10, followers: 10, public_gists: 0, public_repos: 2 },
    });
    renderer.render(<GithubUserProfileMiddle />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
