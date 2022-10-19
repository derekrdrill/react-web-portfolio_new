import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { GithubUserProfileBio } from '../../components/GithubUserProfileBio';

configure({ adapter: new Adapter() });

const renderer = new ShallowRenderer();

describe('GithubUserProfileBio tests', () => {
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
      user: { bio: 'TEST BIO' },
    });
    renderer.render(<GithubUserProfileBio />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders GithubUserProfileBio with bio correctly', () => {
    useContextMock.mockReturnValue({
      user: { bio: 'TEST BIO' },
    });

    const githubUserProfileBio = shallow(<GithubUserProfileBio />);

    expect(githubUserProfileBio.exists('.default-bio')).toEqual(false);
    expect(githubUserProfileBio.props().className).toEqual('bio');
    expect(githubUserProfileBio.props().children).toEqual('TEST BIO');
  });

  it('renders GithubUserProfileBio with no bio correctly', () => {
    useContextMock.mockReturnValue({
      user: { bio: null },
    });

    const githubUserProfileBio = shallow(<GithubUserProfileBio />);

    expect(githubUserProfileBio.exists('.default-bio')).toEqual(true);
    expect(githubUserProfileBio.props().children[0]).toEqual('N/A');
  });
});
