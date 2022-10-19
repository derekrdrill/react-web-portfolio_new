import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { GithubUserSearch } from '../../components/GithubUserSearch';
import { handleChange, handleClearUsers } from '../../components/GithubUserSearch';

const renderer = new ShallowRenderer();

describe('GithubUserSearch tests', () => {
  const searchInput = { current: { focus: jest.fn() } };

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

  it('runs handleChange', () => {
    const e = { currentTarget: { value: 'new value' } };
    const e2 = { currentTarget: { value: null } };

    expect(handleChange(e, jest.fn(), handleClearUsers, searchInput, jest.fn())).toEqual(
      'new value',
    );
    expect(handleChange(e2, jest.fn(), handleClearUsers, searchInput, jest.fn())).toEqual(null);
  });

  it('runs handleClearUsers', () => {
    expect(handleClearUsers(jest.fn(), searchInput, jest.fn())).toEqual(null);
  });
});
