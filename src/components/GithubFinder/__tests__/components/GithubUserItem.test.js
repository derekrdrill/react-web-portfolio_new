import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserItem } from '../../components/GithubUserItem';

const renderer = new ShallowRenderer();

describe('GithubUserItem tests', () => {
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
    useContextMock.mockReturnValue({ githubDispatch: jest.fn() });
    renderer.render(<GithubUserItem user={{ login: 'test', avatar_url: 'www.fake.com' }} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
