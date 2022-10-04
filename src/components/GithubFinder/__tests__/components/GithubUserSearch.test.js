import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserSearch } from '../../components/GithubUserSearch';

const renderer = new ShallowRenderer();

describe('GithubUserSearch tests', () => {
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
    useContextMock.mockReturnValue({ alertDispatch: jest.fn(), githubDispatch: jest.fn() });
    renderer.render(<GithubUserSearch />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
