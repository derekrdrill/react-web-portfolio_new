import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserProfileTop } from '../../components/GithubUserProfileTop';
import { getBlog, getTwitterUsername } from '../../components/GithubUserProfileTop';

const renderer = new ShallowRenderer();

describe('GithubUserProfileTop tests', () => {
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
      user: {
        avatar_url: 'www.fakeav.com',
        bio: 'test bio',
        blog: 'www.fakeblog.com',
        hireable: true,
        html_url: 'www.github.com/fake',
        location: 'location',
        login: 'test login',
        name: 'test name',
        twitter_username: 'test twitter',
        type: 'test type',
      },
    });
    renderer.render(<GithubUserProfileTop />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('runs getBlog', () => {
    expect(getBlog('BLOG')).toEqual('BLOG');
    expect(getBlog(null)).toEqual('N/A');
  });

  it('runs getTwitterUsername', () => {
    expect(getTwitterUsername('USERNAME')).toEqual('USERNAME');
    expect(getTwitterUsername(null)).toEqual('N/A');
  });
});
