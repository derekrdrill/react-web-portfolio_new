import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { GithubUsersContainer } from '../../components/GithubUsersContainer';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('Github Users Container tests', () => {
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
    useContextMock.mockReturnValue({ loading: false, user: {}, users: [] });
    renderer.render(<GithubUsersContainer />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders GithubUsersContainer that is loading correctly', () => {
    useContextMock.mockReturnValue({
      loading: true,
    });

    const githubUsersContainer = shallow(<GithubUsersContainer />);

    expect(githubUsersContainer.props().children[0].type.toString()).toContain(
      'function LoaderSpinner(',
    );
  });

  it('renders GithubUsersContainer that is loading correctly', () => {
    useContextMock.mockReturnValue({
      loading: false,
      user: null,
      users: [
        {
          avatar_url: 'www.fakeav.com',
          bio: 'test bio',
          blog: 'www.fakeblog.com',
          following: 10,
          followers: 10,
          id: 'test-id',
          hireable: true,
          html_url: 'www.github.com/fake',
          location: 'location',
          login: 'test login',
          name: 'test name',
          public_gists: 0,
          public_repos: 2,
          twitter_username: 'test twitter',
          type: 'test type',
        },
      ],
    });

    const githubUsersContainer = shallow(<GithubUsersContainer />);
    expect(githubUsersContainer.exists('.user-item-test-id')).toEqual(true);
  });

  it('renders GithubUsersContainer that is loading correctly', () => {
    useContextMock.mockReturnValue({
      loading: false,
      user: { id: 'test-id' },
      users: null,
    });

    const githubUsersContainer = shallow(<GithubUsersContainer />);
    expect(githubUsersContainer.exists('.user-profile')).toEqual(true);
  });
});
