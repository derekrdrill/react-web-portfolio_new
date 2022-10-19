import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserProfile } from '../../components/GithubUserProfile';

const renderer = new ShallowRenderer();

describe('Github Finder tests', () => {
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
    renderer.render(<GithubUserProfile />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
